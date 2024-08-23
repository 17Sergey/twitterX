import Posts from "../../components/common/Posts/Posts";
import CreatePost from "./CreatePost";
import TabsList from "../../components/common/Tabs/TabsList";
import Tab from "../../components/common/Tabs/Tab";
import { useState } from "react";

function HomePage() {
    const [activeTab, setActiveTab] = useState("forYou");
    return (
        <div className="min-h-screen">
            <TabsList>
                <Tab
                    activeTab={activeTab}
                    name={"forYou"}
                    text="For you"
                    toggleActive={() => setActiveTab("forYou")}
                />
                <Tab
                    activeTab={activeTab}
                    name={"following"}
                    text="Following"
                    toggleActive={() => setActiveTab("following")}
                />
            </TabsList>
            <CreatePost />
            <Posts />
        </div>
    );
}

export default HomePage;
