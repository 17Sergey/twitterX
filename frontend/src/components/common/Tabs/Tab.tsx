type TabProps = {
    activeTab: string;
    name: string;
    text: string;
    toggleActive: () => void;
};

export default function Tab({ activeTab, name, text, toggleActive }: TabProps) {
    return (
        <div
            className="text-center w-full relative cursor-pointer pt-4 pb-3 transition-colors hover:bg-neutral"
            onClick={toggleActive}
        >
            <a role="tab">{text}</a>
            <div
                className={`absolute bottom-0 ${
                    activeTab === name ? 'w-1/4' : 'w-0'
                } transition-all left-1/2 -translate-x-1/2 h-1 rounded-full bg-primary`}
            ></div>
        </div>
    );
}
