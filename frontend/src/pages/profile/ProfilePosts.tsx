import { useState } from "react";

import TabsList from "../../components/common/Tabs/TabsList";
import Tab from "../../components/common/Tabs/Tab";
import Posts from "../../components/common/Posts/Posts";
import { UserType } from "../../utils/dataTypes";

export default function ProfilePosts({ userProfile }: { userProfile: UserType }) {
    const [activeTab, setActiveTab] = useState("userPosts");

    return (
        <>
            <TabsList className="mt-8 md:mt-0">
                <Tab
                    activeTab={activeTab}
                    name={"userPosts"}
                    text="Posts"
                    toggleActive={() => setActiveTab("userPosts")}
                />
                <Tab
                    activeTab={activeTab}
                    name={"liked"}
                    text="Likes"
                    toggleActive={() => setActiveTab("liked")}
                />
            </TabsList>
            <Posts
                activeTab={activeTab}
                userId={userProfile._id}
            />
        </>
    );
}
