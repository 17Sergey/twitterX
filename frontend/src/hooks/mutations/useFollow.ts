import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { usersAPI } from "../../api/usersAPI";
import { QUERY_KEYS } from "../../utils/queryKeys";
import { UserProfileType } from "../../utils/dataTypes";

type FollowResponse = {
    message: string;
    followed: boolean;
};

export const useFollow = (userId: string) => {
    const queryClient = useQueryClient();

    const { mutate: follow, isPending } = useMutation({
        mutationKey: ["follow"],
        mutationFn: () => usersAPI.follow(userId),
        onSuccess: (data: FollowResponse) => {
            Promise.all([
                queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_AUTH] }),
                queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SUGGESTED_USERS] }),
                queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROFILE] }), // ???
                // queryClient.setQueryData([QUERY_KEYS.PROFILE], (oldData: UserProfileType) => {
                //     // oldData.following.map(followedUser => {
                //     //     if (data.followed) return
                //     // })
                // });
            ]);
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });

    return { follow, isPending };
};
