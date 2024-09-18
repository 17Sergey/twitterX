import { FaLink } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";

import { UserProfileType } from "../../../../utils/dataTypes";
import { formatMemberSinceDate } from "../../../../utils/dateFunctions";
import { useModal } from "../../../../hooks/useModal";
import Modal from "../../../../components/common/Modal";
import FollowingModal from "./FollowingModal";

export default function ProfileInfo({ userProfile }: { userProfile: UserProfileType }) {
    const memberSinceDate = formatMemberSinceDate(userProfile.createdAt);

    const { modalRef: followingModalRef, openModal: openFollowingModal } = useModal();

    const { modalRef: followersModalRef, openModal: openFollowersModal } = useModal();

    return (
        <div className="p-4 pt-0 -mt-10">
            <div>
                <p className="font-bold text-lg">{userProfile?.fullName}</p>
                <p className="text-sm text-slate-500">@{userProfile?.username}</p>
                <p className="text-sm my-1">{userProfile?.bio}</p>
            </div>
            <div className="my-4 flex flex-col items-start md:flex-row md:items-center gap-4">
                {userProfile?.link && (
                    <div className="flex flex-wrap gap-2 items-center">
                        <FaLink className="w-3 h-3 fill-slate-500" />
                        <a
                            href="https://youtube.com/@asaprogrammer_"
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-blue-500 hover:underline"
                        >
                            {userProfile?.link}
                        </a>
                    </div>
                )}
                <div className="flex gap-2 items-center">
                    <IoCalendarOutline className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-500">{memberSinceDate}</span>
                </div>
            </div>
            <div className="flex gap-2">
                <div>
                    <p
                        className="text-sm font-light cursor-pointer underline underline-offset-2"
                        onClick={openFollowingModal}
                    >
                        <span className="font-bold">{userProfile?.following?.length || 0}</span>
                        &nbsp;Following
                    </p>
                    <FollowingModal
                        followingModalRef={followingModalRef}
                        userProfile={userProfile}
                    />
                </div>
                <div>
                    <p
                        className="text-sm font-light cursor-pointer underline underline-offset-2"
                        onClick={openFollowersModal}
                    >
                        <span className="font-bold">{userProfile?.followers?.length || 0}</span>
                        &nbsp;Followers
                    </p>
                    <Modal
                        title={"FOLLOWERS"}
                        modalRef={followersModalRef}
                    >
                        <div className="overflow-y-auto max-h-96">
                            {userProfile?.followers?.length === 0 && (
                                <p>Oops...Not followers yet</p>
                            )}
                            {/* {userProfile?.followers.toString()} */}
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
