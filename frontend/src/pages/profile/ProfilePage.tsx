import { useState } from "react";
import Posts from "../../components/common/Posts/Posts";
import TabsList from "../../components/common/Tabs/TabsList";
import Tab from "../../components/common/Tabs/Tab";
import { FaArrowLeft } from "react-icons/fa";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import ProfileHeader from "./ProfileHeader";
import { Link } from "react-router-dom";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("posts");

    const user = {
        fullName: "John Doe",
    };

    const isLoading = !true;

    if (isLoading) return <ProfileHeaderSkeleton />;

    if (!isLoading && !user)
        return (
            <div className="flex items-center gap-4 mt-8">
                <Link to="/">
                    <button className="btn btn-sm btn-circle btn-ghost">
                        <FaArrowLeft className="w-4 h-4" />
                    </button>
                </Link>
                <p className="text-center text-lg">User not found</p>
            </div>
        );

    return (
        <div>
            <div className="flex items-center gap-4 py-4 px-4">
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
            <ProfileHeader />
            <TabsList className="mt-8 md:mt-0">
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
