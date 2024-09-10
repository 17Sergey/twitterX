import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { NotificationType } from "../../utils/dataTypes";

type NotificationProps = {
    notification: NotificationType;
};

export default function Notification({ notification }: NotificationProps) {
    return (
        <div className="p-4 flex items-center justify-between gap-4">
            <div className="flex gap-2 items-center">
                <Link to={`/profile/${notification.from.username}`}>
                    <img
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                        src={notification.from.profileImg || "/avatar-placeholder.png"}
                        alt="User avatar"
                    />
                </Link>
                <p className="font-normal flex flex-col md:flex-row gap-1 md:gap-2">
                    <Link to={`/profile/${notification.from.username}`}>
                        <span className="font-bold">@{notification.from.username} </span>
                    </Link>
                    <span className="font-thin">
                        {notification.type === "like" && " liked your post"}
                        {notification.type === "follow" && " followed you"}
                    </span>
                </p>
            </div>
            <div>
                {notification.type === "like" && <FaHeart className="w-6 h-6 fill-error" />}
                {notification.type === "follow" && <FaUser className="w-6 h-6 fill-primary" />}
            </div>
        </div>
    );
}
