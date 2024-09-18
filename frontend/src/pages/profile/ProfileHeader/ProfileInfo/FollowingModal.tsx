import { RefObject } from "react";
import Modal from "../../../../components/common/Modal";

import { UserProfileType } from "../../../../utils/dataTypes";
import UserProfile from "../../../../components/common/UserProfile";
import FollowButton from "../../../../components/common/RightPanel/FollowButton";

export default function FollowingModal({
    userProfile,
    followingModalRef,
}: {
    userProfile: UserProfileType;
    followingModalRef: RefObject<HTMLDialogElement>;
}) {
    return (
        <Modal
            title={"FOLLOWING"}
            modalRef={followingModalRef}
        >
            <div className="overflow-y-auto max-h-96 pr-4">
                {userProfile?.following?.length === 0 && <p>Oops...Not following anyone yet.</p>}
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
                })}
            </div>
        </Modal>
    );
}
