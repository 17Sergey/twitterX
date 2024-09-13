import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

import { UserProfileType } from "../../utils/dataTypes";

export default function ProfileMenu({ userProfile }: { userProfile: UserProfileType }) {
    return (
        <div className="flex items-center gap-4 py-4 px-4">
            <Link to="/">
                <button className="btn btn-sm btn-circle btn-ghost">
                    <FaArrowLeft className="w-4 h-4" />
                </button>
            </Link>
            <div>
                <p className="font-bold text-xl">{userProfile.fullName}</p>
                <p className="text-sm text-slate-500">{userProfile.posts || 0} posts</p>
            </div>
        </div>
    );
}
