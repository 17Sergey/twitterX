import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "../../utils/queryKeys";
import { NullableUpdateProfileDataType, usersAPI } from "../../api/usersAPI";

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    const { mutate: updateProfile, isPending } = useMutation({
        mutationFn: (data: NullableUpdateProfileDataType) => usersAPI.updateProfile(data),
        onSuccess: (data) => {
            toast.success("Profile updated successfully");
            queryClient.setQueryData([QUERY_KEYS.PROFILE], data);
            Promise.all([
                queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_AUTH] }),
                queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] }),
            ]);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { updateProfile, isPending };
};
