import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { postsAPI } from "../../api/postsAPI";
import { PostType } from "../../utils/dataTypes";
import { QUERY_KEYS } from "../../utils/queryKeys";

export const useLike = (postId: string) => {
    const queryClient = useQueryClient();

    const { mutate: likeMutation, isPending: isLiking } = useMutation({
        mutationFn: () => postsAPI.likePost(postId),
        onSuccess: (data) => {
            queryClient.setQueryData([QUERY_KEYS.POSTS], (oldData: Array<PostType>) => {
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
