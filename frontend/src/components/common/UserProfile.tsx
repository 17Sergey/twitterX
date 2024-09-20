import { ComponentProps } from "react";
import { Link } from "react-router-dom";

import { UserData } from "./Sidebar/Sidebar";

type UserProfileProps = UserData;

export default function UserProfile({ fullName, username, profileImg }: UserProfileProps) {
    return (
        <Link
            to={`/profile/${username}`}
            className={`cursor-pointer w-fit flex items-center gap-3`}
        >
            <UserProfileAvatar src={profileImg} />
            <div>
                <UserProfileName fullName={fullName} />
                <UserProfileUsername username={username} />
            </div>
        </Link>
    );
}

export function UserProfileAvatar({ className, src }: ComponentProps<"img">) {
    return (
        <img
            className={`w-10 h-10 rounded-full shrink-0 ${className}`}
            src={src || "/avatar-placeholder.png"}
            alt="Avatar"
        />
    );
}

type UserProfileNameProps = ComponentProps<"p"> & {
    fullName: string;
};
export function UserProfileName({ fullName, className }: UserProfileNameProps) {
    return (
        <p
            className={`font-semibold text-[--theme-accent] text-base ${className}`}
            title={fullName}
        >
            {fullName}
        </p>
    );
}

type UserProfileUsernameProps = ComponentProps<"p"> & {
    username: string;
};
export function UserProfileUsername({ username, className }: UserProfileUsernameProps) {
    return <p className={`text-sm ${className}`}>@{username}</p>;
}
