import { useState } from 'react';
import Tab from './Tab';

export default function TabsList() {
    const [activeTab, setActiveTab] = useState('forYou');
    return (
        <div
            role="tablist"
            className="flex border-b border-neutral"
        >
            <Tab
                activeTab={activeTab}
                name={'forYou'}
                text="For you"
                toggleActive={() => setActiveTab('forYou')}
            />
            <Tab
                activeTab={activeTab}
                name={'following'}
                text="Following"
                toggleActive={() => setActiveTab('following')}
            />
        </div>
    );
}
