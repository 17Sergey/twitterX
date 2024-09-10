import { IoSettingsOutline } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import Notification from "./Notification";

import { QUERY_KEYS } from "../../utils/queryKeys";
import { NotificationType } from "../../utils/dataTypes";
import { notificationsAPI } from "../../api/notificationsAPI";

export default function Notifications() {
    const {
        data: notifications,
        isLoading,
        error,
    } = useQuery({
        queryKey: [QUERY_KEYS.NOTIFICATIONS],
        queryFn: notificationsAPI.getNotifications,
        // To refetch every time we open the page
        staleTime: 0,
        gcTime: 0,
    });

    const queryClient = useQueryClient();

    const { mutate: deleteNotifications, isPending: isDeleting } = useMutation({
        mutationFn: notificationsAPI.deleteNotifications,
        onSuccess: () => {
            toast.success("All notifications deleted");

            // No data anymore
            queryClient.setQueryData([QUERY_KEYS.NOTIFICATIONS], []);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleDeleteNotifications = () => {
        deleteNotifications();

        // Hide dropdown
        const elem = document.activeElement;
        if (elem) {
            (elem as HTMLElement).blur();
        }
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
                            <button onClick={handleDeleteNotifications}>
                                Delete all notifications
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                {error && <p className="text-error">{error.message}</p>}
                {(isLoading || isDeleting) && (
                    <div className="mt-4 flex justify-center h-full items-center">
                        <LoadingSpinner className="loading-lg" />
                    </div>
                )}
                {notifications?.length === 0 && (
                    <div className="text-center p-4 font-bold">No notifications 🤔</div>
                )}
                {!isLoading &&
                    !isDeleting &&
                    notifications.map((notification: NotificationType) => (
                        <Notification
                            key={notification._id}
                            notification={notification}
                        />
                    ))}
            </div>
        </div>
    );
}
