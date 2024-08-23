import { Link } from "react-router-dom";
import XSvg from "../../svgs/XSvg";
import UserProfile from "../UserProfile";
import SidebarMenu from "./SidebarMenu";
import SidebarMenuItem from "./SidebarMenuItem";

import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import toast from "react-hot-toast";
import { apiHandler } from "../../../api/apiHandler";
import { useMutation } from "@tanstack/react-query";

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

    const { mutate } = useMutation({
        mutationFn: apiHandler.logOut,
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleLogOut = () => {
        mutate();
    };

    const iconStyles = `w-7 h-7`;

    return (
        <div className="max-w-56 flex flex-col shrink-0 h-screen pb-8 pr-2 sticky top-6">
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
                    <Link
                        to="/login"
                        onClick={handleLogOut}
                    >
                        <BiLogOut className="w-7 h-7 ml-4" />
                    </Link>
                </UserProfile>
            )}
        </div>
    );
}
