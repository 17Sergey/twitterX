import { ChangeEvent, FormEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CiImageOn } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";

import { postsAPI } from "../../api/postsAPI";
import { QUERY_KEYS } from "../../utils/queryKeys";
import { useUser } from "../../hooks/queries/useUser";
import { UserProfileAvatar, UserProfileName } from "../../components/common/UserProfile";

function CreatePost() {
    const [text, setText] = useState("");
    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const [img, setImg] = useState<string | null>(null);
    const imgRef = useRef<HTMLInputElement>(null);

    const handleImgChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === "string") {
                    setImg(reader?.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const clearImage = () => {
        setImg(null);
        if (imgRef.current) {
            imgRef.current.value = "";
        }
    };

    const { userAuth } = useUser();

    const queryClient = useQueryClient();

    const { mutate: createPost, isPending: isPosting } = useMutation({
        mutationFn: () => postsAPI.createPost({ text, img }),
        onSuccess: () => {
            toast.success("Post created successfully");
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.POSTS],
            });

            setText("");
            clearImage();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isPosting) return;
        createPost();
    };

    return (
        <div className="p-4">
            <div className="flex items-center gap-3">
                <UserProfileAvatar src={userAuth?.profileImg} />
                <div>
                    <UserProfileName
                        fullName={userAuth?.fullName || ""}
                        className="font-semibold text-[--theme-accent] text-base max-w-full"
                    />
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="mt-4 textarea resize-none rounded-none w-full text-lg pl-0 border-none focus:outline-none focus:border-b"
                    placeholder="What's happening?"
                    value={text}
                    onChange={handleTextChange}
                />
                {img && (
                    <div className="w-3/4 mx-auto mb-6 relative pt-4">
                        <IoCloseSharp
                            className="absolute top-5 -right-3 text-[--theme-accent] bg-neutral rounded-full w-6 h-6 cursor-pointer"
                            onClick={clearImage}
                        />
                        <img
                            className="mt-4"
                            src={img}
                            alt="Uploaded"
                        />
                    </div>
                )}
                <div className="pt-2 border-t border-t-neutral">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <CiImageOn
                                className="w-7 h-7 fill-primary cursor-pointer"
                                onClick={() => imgRef?.current?.click()}
                            />
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                ref={imgRef}
                                onChange={handleImgChange}
                            />
                        </div>
                        <button className="btn btn-primary text-[--theme-accent] btn-sm rounded-full px-4">
                            {isPosting ? "Posting..." : "Post"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreatePost;
