async function getNotifications() {
    const res = await fetch("/api/notifications");

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    return data;
}

async function deleteNotifications() {
    const res = await fetch("/api/notifications", {
        method: "DELETE",
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    return data;
}

export const notificationsAPI = {
    getNotifications,
    deleteNotifications,
};
