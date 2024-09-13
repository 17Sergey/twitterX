import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserType } from "../../utils/dataTypes";

export default function ProfileMenu({ userProfile }: { userProfile: UserType }) {
    return (
        <div className="flex items-center gap-4 py-4 px-4">
            <Link to="/">
                <button className="btn btn-sm btn-circle btn-ghost">
                    <FaArrowLeft className="w-4 h-4" />
                </button>
            </Link>
            <div>
                <p className="font-bold text-xl">{userProfile.fullName}</p>
                <p className="text-sm text-slate-500">5? posts</p>
            </div>
        </div>
    );
}
