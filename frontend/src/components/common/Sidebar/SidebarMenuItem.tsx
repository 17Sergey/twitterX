import React from 'react';

type SidebarMenuItemProps = {
    icon: React.ReactElement;
    text: string;
};

export default function SidebarMenuItem({ icon, text }: SidebarMenuItemProps) {
    return (
        <div className="flex">
            <div className="">{icon}</div>

            {text}
        </div>
    );
}
