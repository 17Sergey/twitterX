import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

import XSvg from "../../svgs/XSvg";
import { UserProfileAvatar, UserProfileName, UserProfileUsername } from "../UserProfile";
import SidebarMenu from "./SidebarMenu";
import SidebarMenuItem from "./SidebarMenuItem";

import { authAPI } from "../../../api/authAPI.ts";
import { UserType } from "../../../utils/dataTypes";
import { QUERY_KEYS } from "../../../utils/queryKeys";

export type UserData = {
    fullName: string;
    username: string;
    profileImg: string;
};

export default function Sidebar() {
    const { data: userAuth } = useQuery<UserType>({ queryKey: [QUERY_KEYS.USER_AUTH] });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: authAPI.logOut,
        onSuccess: (data: { message: string }) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_AUTH] });
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
        <div className="max-w-56 hidden md:flex flex-col shrink-0 h-screen pb-8 pt-4 sticky top-0">
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
                    path={`/profile/${userAuth?.username}`}
                />
            </SidebarMenu>
            {userAuth && (
                <div className="flex justify-between items-center gap-4 mt-auto px-4 py-2 rounded-full transition-colors hover:bg-neutral">
                    <Link
                        to={`/profile/${userAuth.username}`}
                        className={`cursor-pointer flex items-center gap-3`}
                    >
                        <UserProfileAvatar src={userAuth.profileImg} />
                        <div>
                            <UserProfileName
                                fullName={userAuth.fullName}
                                className="max-w-24 truncate"
                            />
                            <UserProfileUsername username={userAuth.username} />
                        </div>
                    </Link>
                    <Link
                        to="/login"
                        onClick={handleLogOut}
                    >
                        <BiLogOut className="w-7 h-7" />
                    </Link>
                </div>
            )}
        </div>
    );
}
