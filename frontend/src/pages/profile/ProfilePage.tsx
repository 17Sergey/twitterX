import React, { useState } from "react";
import Posts from "../../components/common/Posts/Posts";
import TabsList from "../../components/common/TabsList";
import Tab from "../home/Tab";
import { FaArrowLeft, FaLink } from "react-icons/fa";
import EditProfileModal from "./EditProfileModal";
import { Link } from "react-router-dom";
import { IoCalendarOutline } from "react-icons/io5";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("posts");

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

    const isLoading = false;
    const isMyProfile = true;

    const isFollowedByMe = true;

    return (
        <div>
            <div className="flex items-center gap-4 py-4">
                <Link to="/">
                    <button className="btn btn-sm btn-circle btn-ghost">
                        <FaArrowLeft className="w-4 h-4" />
                    </button>
                </Link>
                <div>
                    <p className="font-bold text-xl">{user?.fullName}</p>
                    <p className="text-sm text-slate-500">5 posts</p>
                </div>
            </div>
            <div>
                <img
                    className="w-full h-56 object-cover"
                    src={user?.coverImg || "/cover.png"}
                    alt=""
                />
            </div>
            <div className="flex items-start justify-between">
                <img
                    className="-translate-y-1/2 w-32 pl-4 "
                    src={user?.profileImg || "./avatar-placeholder.png"}
                />
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
            <div className="p-4 pt-0 -mt-4">
                <div>
                    <p className="font-bold text-lg">{user?.fullName}</p>
                    <p className="text-sm text-slate-500">@{user?.username}</p>
                    <p className="text-sm my-1">{user?.bio}</p>
                </div>
                <div className="my-4 flex items-center gap-4">
                    <div className="flex gap-2 items-center">
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
            <TabsList>
                <Tab
                    activeTab={activeTab}
                    name={"posts"}
                    text="Posts"
                    toggleActive={() => setActiveTab("posts")}
                />
                <Tab
                    activeTab={activeTab}
                    name={"likes"}
                    text="Likes"
                    toggleActive={() => setActiveTab("likes")}
                />
            </TabsList>
            <Posts />
        </div>
    );
}
