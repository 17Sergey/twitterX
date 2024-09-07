import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { postsAPI } from "../api/postsAPI";
import { PostType } from "../utils/dataTypes";

export const useLike = ({ postId, activeTab }: { postId: string; activeTab: string }) => {
    const queryClient = useQueryClient();

    const { mutate: likeMutation, isPending: isLiking } = useMutation({
        mutationFn: () => postsAPI.likePost(postId),
        onSuccess: (data) => {
            queryClient.setQueryData(["posts", activeTab], (oldData: Array<PostType>) => {
                return oldData.map((p) => {
                    if (p._id === postId) {
                        return { ...p, likes: data.updatedLikes };
                    }
                    return p;
                });
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { likeMutation, isLiking };
};
