import { FaLink } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";

import { UserType } from "../../utils/dataTypes";
import { formatMemberSinceDate } from "../../utils/dateFunctions";

export default function ProfileInfo({ userProfile }: { userProfile: UserType }) {
    const memberSinceDate = formatMemberSinceDate(userProfile.createdAt);

    return (
        <div className="md:p-4 pt-0 -mt-10">
            <div>
                <p className="font-bold text-lg">{userProfile?.fullName}</p>
                <p className="text-sm text-slate-500">@{userProfile?.username}</p>
                <p className="text-sm my-1">{userProfile?.bio}</p>
            </div>
            <div className="my-4 flex flex-col items-start md:flex-row md:items-center gap-4">
                {userProfile?.link && (
                    <div className="flex flex-wrap gap-2 items-center">
                        <FaLink className="w-3 h-3 fill-slate-500" />
                        <a
                            href="https://youtube.com/@asaprogrammer_"
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-blue-500 hover:underline"
                        >
                            {userProfile?.link}
                        </a>
                    </div>
                )}
                <div className="flex gap-2 items-center">
                    <IoCalendarOutline className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-500">{memberSinceDate}</span>
                </div>
            </div>
            <div className="flex gap-2">
                <p className="text-sm font-light">
                    <span className="font-bold mr-1">{userProfile?.following?.length || 0}</span>
                    Following
                </p>
                <p className="text-sm font-light">
                    <span className="font-bold mr-1">{userProfile?.followers?.length || 0}</span>
                    Followers
                </p>
            </div>
        </div>
    );
}
