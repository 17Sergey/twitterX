import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProfileNotFound() {
    return (
        <div className="flex items-center gap-4 py-4 px-4">
            <Link to="/">
                <button className="btn btn-sm btn-circle btn-ghost">
                    <FaArrowLeft className="w-4 h-4" />
                </button>
            </Link>
            <div>
                <p className="text-lg">User not found</p>
            </div>
        </div>
    );
}
