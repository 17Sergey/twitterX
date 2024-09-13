import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { UserType } from "../utils/dataTypes";
import { QUERY_KEYS } from "../utils/queryKeys";
import { usersAPI } from "../api/usersAPI";

export const useFetchProfile = (username: string) => {
    const {
        data: userProfile,
        isLoading,
        isRefetching,
        error,
        refetch,
    } = useQuery<UserType>({
        queryKey: [QUERY_KEYS.PROFILE],
        queryFn: () => usersAPI.getProfile(username),
        retry: 0,
    });

    useEffect(() => {
        refetch();
    }, [username, refetch]);

    return { userProfile, isLoading, isRefetching, error };
};
