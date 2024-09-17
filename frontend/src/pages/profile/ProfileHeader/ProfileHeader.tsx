import { useState } from "react";

import EditProfileModal from "./EditProfileModal";
import ProfileInfo from "./ProfileInfo";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import ProfileCoverImg from "./ProfileCoverImg";
import ProfileImg from "./ProfileImg";

import { UserProfileType } from "../../../utils/dataTypes";
import { useUser } from "../../../hooks/queries/useUser";
import { useFollow } from "../../../hooks/mutations/useFollow";

export default function ProfileHeader({ userProfile }: { userProfile: UserProfileType }) {
    const { userAuth } = useUser();

    const isMyProfile = userAuth?._id === userProfile._id;
    const isFollowedByMe = userAuth?.following.includes(userProfile._id);

    const { follow, isFollowing } = useFollow(userProfile._id);

    const handleFollow = () => {
        follow();
    };

    const [coverImg, setCoverImg] = useState<string | null>(null);
    const [profileImg, setProfileImg] = useState<string | null>(null);

    return (
        <div>
            <ProfileCoverImg
                isMyProfile={isMyProfile}
                userImg={userProfile?.coverImg}
                uploadedImg={coverImg}
                setUploadedImg={setCoverImg}
            />
            <div className="flex items-start justify-between px-4">
                <div className="-translate-y-1/2">
                    <ProfileImg
                        isMyProfile={isMyProfile}
                        userImg={userProfile?.profileImg}
                        uploadedImg={profileImg}
                        setUploadedImg={setProfileImg}
                    />
                </div>
                {isMyProfile && (
                    <EditProfileModal
                        userProfile={userProfile}
                        coverImg={coverImg}
                        setCoverImg={setCoverImg}
                        profileImg={profileImg}
                        setProfileImg={setProfileImg}
                    />
                )}
                {!isMyProfile && !isFollowedByMe && (
                    <button
                        className="mt-4 btn btn-primary rounded-full text-[--theme-accent] btn-sm"
                        onClick={handleFollow}
                    >
                        {isFollowing ? <LoadingSpinner className="loading-xs" /> : "Follow"}
                    </button>
                )}
                {!isMyProfile && isFollowedByMe && (
                    <button
                        className="mt-4 btn btn-outline btn-primary rounded-full hover:color-white hover:text-[--theme-accent] btn-sm"
                        onClick={handleFollow}
                    >
                        {isFollowing ? <LoadingSpinner className="loading-xs" /> : "Unfollow"}
                    </button>
                )}
            </div>
            <ProfileInfo userProfile={userProfile} />
        </div>
    );
}
