import React, { ChangeEvent, Dispatch, FormEvent, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import EditProfileModal from "./EditProfileModal";
import { FaLink } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";

export default function ProfileHeader() {
    const user = {
        _id: "1",
        fullName: "John Doe",
        username: "johndoe",
        profileImg: "/avatars/boy2.png",
        coverImg: "/cover.png",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        link: "https://youtube.com/@asaprogrammer_",
        following: ["1", "2", "3"],
        followers: ["1", "2", "3"],
    };

    const isMyProfile = true;

    const isFollowedByMe = true;

    const [coverImg, setCoverImg] = useState<string | null>(null);
    const [profileImg, setProfileImg] = useState<string | null>(null);

    const coverImgRef = useRef<HTMLInputElement>(null);
    const profileImgRef = useRef<HTMLInputElement>(null);

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
                <img
                    className="w-full h-64 object-cover"
                    src={coverImg || user?.coverImg || "/cover.png"}
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
                    <img
                        className="w-32 h-32 object-cover rounded-full"
                        src={profileImg || user?.profileImg || "./avatar-placeholder.png"}
                    />
                    {isMyProfile && (
                        <form onSubmit={handleSubmit}>
                            <button
                                className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-all btn btn-sm btn-circle btn-primary absolute top-1 right-1"
                                onClick={() => triggerImageChange(profileImgRef)}
                            >
                                <MdEdit className="w-4 h-4 fill-[--theme-accent]" />
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    ref={profileImgRef}
                                    onChange={(e) => handleImageChange(e, setProfileImg)}
                                />
                            </button>
                        </form>
                    )}
                </div>
                {isMyProfile && <EditProfileModal />}
                {!isMyProfile && !isFollowedByMe && (
                    <button className="mt-4 btn btn-primary rounded-full text-[--theme-accent] btn-sm">
                        Follow
                    </button>
                )}
                {!isMyProfile && isFollowedByMe && (
                    <button className="mt-4 btn btn-outline btn-primary rounded-full text-[--theme-accent] btn-sm">
                        Unfollow
                    </button>
                )}
            </div>
            <div className="md:p-4 pt-0 -mt-4">
                <div>
                    <p className="font-bold text-lg">{user?.fullName}</p>
                    <p className="text-sm text-slate-500">@{user?.username}</p>
                    <p className="text-sm my-1">{user?.bio}</p>
                </div>
                <div className="my-4 flex flex-col items-start md:flex-row md:items-center gap-4">
                    <div className="flex flex-wrap gap-2 items-center">
                        <FaLink className="w-3 h-3 fill-slate-500" />
                        <a
                            href="https://youtube.com/@asaprogrammer_"
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-blue-500 hover:underline"
                        >
                            {user.link}
                        </a>
                    </div>
                    <div className="flex gap-2 items-center">
                        <IoCalendarOutline className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-500">Joined July 2021</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <p className="text-sm font-light">
                        <span className="font-bold mr-1">{user.following?.length || 0}</span>
                        Following
                    </p>
                    <p className="text-sm font-light">
                        <span className="font-bold mr-1">{user.followers?.length || 0}</span>
                        Followers
                    </p>
                </div>
            </div>
        </div>
    );
}
