import { IoSettingsOutline } from "react-icons/io5";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import Notification from "./Notification";

export default function Notifications() {
    const isLoading = true;
    const notifications = [
        {
            _id: "1",
            from: {
                _id: "1",
                username: "johndoe",
                profileImg: "/avatars/boy2.png",
            },
            type: "follow",
        },
        {
            _id: "2",
            from: {
                _id: "2",
                username: "janedoe",
                profileImg: "/avatars/girl1.png",
            },
            type: "like",
        },
    ];

    const deleteNotifications = () => {
        alert("All notifications deleted");
    };

    return (
        <div className="min-h-screen">
            <div className="p-4 border-b border-neutral flex justify-between items-center">
                <span className="font-bold">Notifications</span>
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="m-1"
                    >
                        <IoSettingsOutline className="cursor-pointer w-5 h-5" />
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow"
                    >
                        <li>
                            <a onClick={deleteNotifications}>Delete all notifications</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                {isLoading && (
                    <div className="mt-4 flex justify-center h-full items-center">
                        <LoadingSpinner className="loading-lg" />
                    </div>
                )}
                {notifications?.length === 0 && (
                    <div className="text-center p-4 font-bold">No notifications 🤔</div>
                )}
                {notifications.map((notification) => (
                    <Notification notification={notification} />
                ))}
            </div>
        </div>
    );
}
