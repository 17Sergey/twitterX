import { Link } from "react-router-dom";
import XSvg from "../../svgs/XSvg";
import UserProfile from "../UserProfile";
import SidebarMenu from "./SidebarMenu";
import SidebarMenuItem from "./SidebarMenuItem";

import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

export type UserData = {
    fullName: string;
    username: string;
    profileImg: string;
};

export default function Sidebar() {
    const data: UserData = {
        fullName: "John Doe",
        username: "johndoe",
        profileImg: "/avatars/boy1.png",
    };
    const iconStyles = `w-8 h-8`;

    return (
        <div className="max-w-56 flex flex-col h-screen pt-2 pb-8 border-r border-neutral">
            <Link
                to="/"
                className="px-4"
            >
                <XSvg className="w-10 fill-[--theme-accent]" />
            </Link>
            <SidebarMenu className="mt-8">
                <SidebarMenuItem
                    icon={<MdHomeFilled className={iconStyles} />}
                    text={"Home"}
                    path="/"
                />
                <SidebarMenuItem
                    icon={<IoNotifications className={iconStyles} />}
                    text={"Notifications"}
                    path="/notifications"
                />
                <SidebarMenuItem
                    icon={<FaUser className={iconStyles} />}
                    text={"Profile"}
                    path={`/profile/${data?.username}`}
                />
            </SidebarMenu>
            {data && (
                <UserProfile
                    {...data}
                    className={"mt-auto px-4 py-2 rounded-full transition-colors hover:bg-neutral"}
                >
                    <Link to="/login">
                        <BiLogOut className="w-7 h-7" />
                    </Link>
                </UserProfile>
            )}
        </div>
    );
}
