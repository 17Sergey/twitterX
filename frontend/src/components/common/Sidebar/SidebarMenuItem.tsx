import React from "react";
import { Link } from "react-router-dom";

type SidebarMenuItemProps = {
    icon: React.ReactElement;
    text: string;
    path: string;
};

export default function SidebarMenuItem({ icon, text, path }: SidebarMenuItemProps) {
    return (
        <li>
            <Link
                to={path}
                className="flex items-center gap-4 mb-4 px-4 py-2 rounded-full transition-colors hover:bg-neutral"
            >
                {icon}
                <p>{text}</p>
            </Link>
        </li>
    );
}
