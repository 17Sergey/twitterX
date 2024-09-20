import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import UserProfileSkeleton from "../../skeletons/UserProfileSkeleton";
import { UserProfileAvatar, UserProfileName, UserProfileUsername } from "../UserProfile";
import FollowButton from "./FollowButton";

import { UserType } from "../../../utils/dataTypes";
import { usersAPI } from "../../../api/usersAPI";
import { QUERY_KEYS } from "../../../utils/queryKeys";
import { useUser } from "../../../hooks/queries/useUser";

export default function RightPanel() {
    const {
        data: users,
        isLoading,
        error,
    } = useQuery<UserType[]>({
        queryKey: [QUERY_KEYS.SUGGESTED_USERS],
        queryFn: usersAPI.getSuggestedUsers,
        retry: false,
    });

    const { userAuth } = useUser();

    return (
        <aside className="hidden lg:block shrink-0 sticky top-4 h-fit max-w-72 rounded-lg bg-base-300 p-4">
            <p className="font-bold mb-4">Who to follow</p>
            {error && <p className="text-error-content">{error.message}</p>}
            {isLoading && (
                <>
                    <UserProfileSkeleton className="mb-4">
                        <div className="skeleton bg-base-200 h-8 w-16 rounded-full"></div>
                    </UserProfileSkeleton>
                    <UserProfileSkeleton className="mb-4">
                        <div className="skeleton bg-base-200 h-8 w-16 rounded-full"></div>
                    </UserProfileSkeleton>
                    <UserProfileSkeleton className="mb-4">
                        <div className="skeleton bg-base-200 h-8 w-16 rounded-full"></div>
                    </UserProfileSkeleton>
                    <UserProfileSkeleton className="mb-0">
                        <div className="skeleton bg-base-200 h-8 w-16 rounded-full"></div>
                    </UserProfileSkeleton>
                </>
            )}
            {!isLoading && users?.length === 0 && (
                <p>No users to follow/suggest. Congratulations! 🎉</p>
            )}
            {!isLoading &&
                users &&
                users.map((user) => {
                    return (
                        <div
                            className="flex items-center justify-between gap-4 mb-4 last:mb-0"
                            key={user._id}
                        >
                            <Link
                                to={`/profile/${user.username}`}
                                className={`cursor-pointer flex items-center gap-3`}
                            >
                                <UserProfileAvatar src={user.profileImg} />
                                <div>
                                    <UserProfileName
                                        fullName={user.fullName}
                                        className="max-w-24 truncate"
                                    />
                                    <UserProfileUsername username={user.username} />
                                </div>
                            </Link>
                            <FollowButton
                                key={user._id}
                                userId={user._id}
                                isFollowedProp={userAuth?.following.includes(user._id) || false}
                            />
                        </div>
                    );
                })}
        </aside>
    );
}
