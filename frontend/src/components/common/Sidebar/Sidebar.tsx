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
import { authAPI } from "../../../api/authAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
        onSuccess: (data) => {
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
        <div className="max-w-56 flex flex-col shrink-0 h-screen pb-8 pr-2 pt-4 sticky top-0 border-r border-neutral">
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
                <UserProfile
                    fullName={userAuth.fullName}
                    username={userAuth.username}
                    profileImg={userAuth.profileImg}
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
