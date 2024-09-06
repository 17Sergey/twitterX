import { useQuery } from "@tanstack/react-query";

import { UserType } from "../utils/dataTypes";
import { QUERY_KEYS } from "../utils/queryKeys";

export const useUser = () => {
    const { data: userAuth } = useQuery<UserType>({ queryKey: [QUERY_KEYS.USER_AUTH] });
    return { userAuth };
};
