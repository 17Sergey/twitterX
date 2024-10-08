import { RefObject } from "react";
import { useQuery } from "@tanstack/react-query";

import Modal from "../../../../components/common/Modal";
import UserProfile from "../../../../components/common/UserProfile";
import FollowButton from "../../../../components/common/FollowButton";
import UserProfileSkeleton from "../../../../components/skeletons/UserProfileSkeleton";

import { UserProfileType } from "../../../../utils/dataTypes";
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
        data: followingUsers,
        isLoading,
        error,
    } = useQuery<UserProfileType[]>({
        queryKey: [QUERY_KEYS.FOLLOWING],
        queryFn: () => usersAPI.getFollowingUsers(userProfile.username),
        retry: 0,
    });

    return (
        <Modal
            title={"FOLLOWING"}
            modalRef={followingModalRef}
        >
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
            <div className="overflow-y-auto max-h-96 pr-4">
                <div className="flex flex-col gap-4">
                    {followingUsers?.map((user) => {
                        return (
                            <div className="flex justify-between items-center gap-4">
                                <UserProfile
                                    {...user}
                                    key={user._id}
                                ></UserProfile>
                                <FollowButton
                                    key={user._id}
                                    userId={user._id}
                                />
                            </div>
                        );
                    })}
                </div>
                {followingUsers && followingUsers.length === 0 && (
                    <p>Oops...Not following anyone yet.</p>
                )}
                {error && <p className="text-error-content">{error.message}</p>}
            </div>
        </Modal>
    );
}
