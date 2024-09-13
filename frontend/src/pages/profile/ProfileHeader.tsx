import React, { ChangeEvent, Dispatch, FormEvent, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";

import EditProfileModal from "./EditProfileModal";
import ProfileInfo from "./ProfileInfo";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ProfileImage from "./ImageUploader";

import { UserProfileType } from "../../utils/dataTypes";
import { useUser } from "../../hooks/useUser";
import { useFollow } from "../../hooks/useFollow";

export default function ProfileHeader({ userProfile }: { userProfile: UserProfileType }) {
    const { userAuth } = useUser();

    const isMyProfile = userAuth?._id === userProfile._id;
    const isFollowedByMe = userAuth?.following.includes(userProfile._id);

    const { follow, isFollowing } = useFollow(userProfile._id);

    const handleFollow = () => {
        follow();
    };

    const [coverImg, setCoverImg] = useState<string | null>(null);

    const coverImgRef = useRef<HTMLInputElement>(null);

    const triggerImageChange = (imageRef: typeof coverImgRef) => {
        if (imageRef.current) {
            imageRef.current.click();
        }
    };

    const handleImageChange = (
        e: ChangeEvent<HTMLInputElement>,
        setStateCallback: Dispatch<React.SetStateAction<string | null>>
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === "string") {
                    setStateCallback(reader?.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div>
            <div className="relative group">
                <CoverImage
                    isMyProfile={isMyProfile}
                    userImg={userProfile?.profileImg}
                />
                <img
                    className="w-full h-64 object-cover"
                    src={coverImg || userProfile?.coverImg || "/cover.png"}
                    alt=""
                />
                {isMyProfile && (
                    <form onSubmit={handleSubmit}>
                        <button
                            className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-all btn btn-sm btn-circle btn-primary absolute top-2 right-2"
                            onClick={() => triggerImageChange(coverImgRef)}
                        >
                            <MdEdit className="w-4 h-4 fill-[--theme-accent]" />
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                ref={coverImgRef}
                                onChange={(e) => handleImageChange(e, setCoverImg)}
                            />
                        </button>
                    </form>
                )}
            </div>
            <div className="flex items-start justify-between px-4">
                <div className="relative group -translate-y-1/2">
                    <ProfileImage
                        isMyProfile={isMyProfile}
                        userImg={userProfile?.profileImg}
                    />
                </div>
                {isMyProfile && <EditProfileModal userProfile={userProfile} />}
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
