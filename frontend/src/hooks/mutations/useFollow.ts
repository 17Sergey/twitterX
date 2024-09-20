import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { usersAPI } from "../../api/usersAPI";
// import { QUERY_KEYS } from "../../utils/queryKeys";
import { useState } from "react";
// import { UserProfileType } from "../../utils/dataTypes";

type FollowResponse = {
    message: string;
    followed: boolean;
};

export const useFollow = (userId: string, isFollowedByMe: boolean) => {
    const [isFollowed, setIsFollowed] = useState(isFollowedByMe);
    // const queryClient = useQueryClient();

    const { mutate: follow, isPending } = useMutation({
        mutationKey: ["follow"],
        mutationFn: () => usersAPI.follow(userId),
        onSuccess: (data: FollowResponse) => {
            // Promise.all([
            // queryClient.setQueryData([QUERY_KEYS.PROFILE], (oldData: UserProfileType) => {
            //     oldData.following.push(userId);
            // }),
            // ]);
            // queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FOLLOWING] });
            setIsFollowed(data.followed);
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });

    return { follow, isPending, isFollowed };
};
