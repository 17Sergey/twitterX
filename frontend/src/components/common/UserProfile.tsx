import { ComponentProps } from "react";
import { UserData } from "./Sidebar/Sidebar";
import { Link } from "react-router-dom";

type UserProfileProps = ComponentProps<"div"> & UserData;

export default function UserProfile({
    className,
    fullName,
    username,
    profileImg,
    children,
}: UserProfileProps) {
    return (
        <div className={`flex justify-between items-center ${className}`}>
            <Link
                to={`/profile/${username}`}
                className="cursor-pointer"
            >
                <div className="flex items-center gap-4">
                    <img
                        className="w-10 h-10 rounded-full"
                        src={profileImg || "/avatar-placeholder.png"}
                        alt="Avatar"
                    />
                    <div>
                        <p className="font-semibold text-[--theme-accent] text-base max-w-24 truncate">
                            {fullName}
                        </p>
                        <p className="text-sm">@{username}</p>
                    </div>
                </div>
            </Link>
            {children}
        </div>
    );
}
