import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { usersAPI } from "../../api/usersAPI";
import { QUERY_KEYS } from "../../utils/queryKeys";

type FollowResponse = {
    message: string;
    followed: boolean;
};

export const useFollow = (userId: string) => {
    const queryClient = useQueryClient();

    const { mutate: follow, isPending: isFollowing } = useMutation({
        mutationKey: ["follow"],
        mutationFn: () => usersAPI.follow(userId),
        onSuccess: (data: FollowResponse) => {
            Promise.all([
                queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_AUTH] }),
                queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SUGGESTED_USERS] }),
            ]);
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });

    return { follow, isFollowing };
};
