import { useQuery } from "@tanstack/react-query";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import {
    UserProfileAvatar,
    UserProfileName,
    UserProfileUsername,
} from "../../components/common/UserProfile";
import FollowButton from "../../components/common/FollowButton";

import { usersAPI } from "../../api/usersAPI";
import { QUERY_KEYS } from "../../utils/queryKeys";
import { UserType } from "../../utils/dataTypes";

export default function UsersPage() {
    const {
        data: users,
        isLoading,
        error,
    } = useQuery({
        queryKey: [QUERY_KEYS.USERS],
        queryFn: usersAPI.getAll,
        retry: 1,
    });
    return (
        <div className="min-h-screen p-4 relative">
            <h2 className="font-bold mb-8 text-lg">All users</h2>
            <div className="">
                {error && <p className="text-error">{error.message}</p>}
                {isLoading && (
                    <div className="mt-4 flex justify-center h-full items-center">
                        <LoadingSpinner className="loading-lg" />
                    </div>
                )}
                {users && users?.length === 0 && (
                    <div className="text-center p-4 font-bold">
                        No users received from server...How? 🤔
                    </div>
                )}
                <div className="flex flex-col gap-8">
                    {!isLoading &&
                        users &&
                        users.map((user: UserType) => (
                            <div
                                className="flex justify-between items-center gap-2"
                                key={user._id}
                            >
                                <div className="flex gap-4 items-center">
                                    <UserProfileAvatar
                                        src={user.profileImg}
                                        className="w-24 h-24"
                                    />
                                    <div>
                                        <UserProfileName
                                            fullName={user.fullName}
                                            className="md:text-lg"
                                        />
                                        <UserProfileUsername
                                            username={user.username}
                                            className="md:text-sm"
                                        />
                                    </div>
                                </div>
                                <FollowButton userId={user._id} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
