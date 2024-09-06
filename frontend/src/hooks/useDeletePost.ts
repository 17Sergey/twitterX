import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsAPI } from "../api/postsAPI";
import toast from "react-hot-toast";
import { PostType } from "../utils/dataTypes";

export const useDeletePost = (post: PostType) => {
    const queryClient = useQueryClient();

    const { mutate: deleteMutation, isPending: isDeletePending } = useMutation({
        mutationFn: () => postsAPI.deletePost(post._id),
        onSuccess: () => {
            toast.success("Post deleted successfully");
            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { deleteMutation, isDeletePending };
};
