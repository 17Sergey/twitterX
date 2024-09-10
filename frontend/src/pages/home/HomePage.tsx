import { useState } from "react";

import Posts from "../../components/common/Posts/Posts";
import Tab from "../../components/common/Tabs/Tab";
import TabsList from "../../components/common/Tabs/TabsList";
import CreatePost from "./CreatePost";

function HomePage() {
    const [activeTab, setActiveTab] = useState("forYou");

    const handleToggleTab = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className="min-h-screen">
            <TabsList>
                <Tab
                    activeTab={activeTab}
                    name={"forYou"}
                    text="For you"
                    toggleActive={() => handleToggleTab("forYou")}
                />
                <Tab
                    activeTab={activeTab}
                    name={"following"}
                    text="Following"
                    toggleActive={() => handleToggleTab("following")}
                />
            </TabsList>
            <CreatePost />
            <Posts activeTab={activeTab} />
        </div>
    );
}

export default HomePage;
