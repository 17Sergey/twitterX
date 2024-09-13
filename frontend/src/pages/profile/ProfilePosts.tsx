import { useState } from "react";

import TabsList from "../../components/common/Tabs/TabsList";
import Tab from "../../components/common/Tabs/Tab";
import Posts from "../../components/common/Posts/Posts";

export default function ProfilePosts() {
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
                    name={"likes"}
                    text="Likes"
                    toggleActive={() => setActiveTab("likes")}
                />
            </TabsList>
            <Posts activeTab={activeTab} />
        </>
    );
}
