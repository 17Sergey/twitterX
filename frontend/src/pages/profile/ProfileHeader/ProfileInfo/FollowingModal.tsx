import { RefObject } from "react";
import Modal from "../../../../components/common/Modal";

import { UserProfileType, UserType } from "../../../../utils/dataTypes";
import UserProfile from "../../../../components/common/UserProfile";
import FollowButton from "../../../../components/common/RightPanel/FollowButton";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../../../utils/queryKeys";
import { usersAPI } from "../../../../api/usersAPI";

export default function FollowingModal({
    userProfile,
    followingModalRef,
}: {
    userProfile: UserProfileType;
    followingModalRef: RefObject<HTMLDialogElement>;
}) {
    const {
        data: users,
        isLoading,
        error,
    } = useQuery<UserType>({
        queryKey: [QUERY_KEYS.PROFILE],
        queryFn: () => usersAPI.getProfile(userProfile.username),
        retry: 0,
    });
    return (
        <Modal
            title={"FOLLOWING"}
            modalRef={followingModalRef}
        >
            <div className="overflow-y-auto max-h-96 pr-4">
                {/* {userProfile?.following?.length === 0 && <p>Oops...Not following anyone yet.</p>}
                {userProfile?.following?.map((user) => {
                    return (
                        <UserProfile
                            {...user}
                            key={user._id}
                            className="mb-4 last:mb-0"
                        >
                            <FollowButton
                                key={user._id}
                                userId={user._id}
                                isFollowed={true}
                            />
                        </UserProfile>
                    );
                })} */}
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
                    <p className="max-w-64">No users to follow/suggest. Congratulations! 🎉</p>
                )}
                {!isLoading &&
                    users &&
                    users.map((user) => {
                        return (
                            <UserProfile
                                {...user}
                                key={user._id}
                                className="mb-4 last:mb-0"
                            >
                                <FollowButton
                                    key={user._id}
                                    userId={user._id}
                                    isFollowedProp={userAuth?.following.includes(user._id) || false}
                                />
                            </UserProfile>
                        );
                    })}
            </div>
        </Modal>
    );
}
