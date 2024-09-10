import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";

import { postsAPI } from "../../../api/postsAPI";
import { PostType } from "../../../utils/dataTypes";
import { QUERY_KEYS } from "../../../utils/queryKeys";

type AddCommentFormProps = Pick<PostType, "_id">;

export default function AddCommentForm({ _id: postId }: AddCommentFormProps) {
    const [text, setText] = useState("");
    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const queryClient = useQueryClient();

    const { mutate: commentPost, isPending: isCommenting } = useMutation({
        mutationFn: () => postsAPI.commentPost({ text, _id: postId }),
        onSuccess: (data) => {
            queryClient.setQueryData([QUERY_KEYS.POSTS], (oldData: Array<PostType>) => {
                return oldData.map((p) => {
                    if (p._id === postId) {
                        return data;
                    }
                    return p;
                });
            });
            setText("");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isCommenting) return;
        commentPost();
    };

    return (
        <div className="mt-8">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-start md:flex-row md:items-center gap-4">
                    <textarea
                        className="textarea border-2 border-neutral resize-none focus:outline-none w-full text-base"
                        placeholder="Add a comment..."
                        value={text}
                        onChange={handleTextChange}
                    />
                    <button className="btn btn-primary text-[--theme-accent] btn-sm rounded-full px-4 self-end md:self-center">
                        {isCommenting ? (
                            <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                            "Comment"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
