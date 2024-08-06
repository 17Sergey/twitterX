import Notification from '../models/notification.model.js';

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ to: req.user._id })
            .sort({ createdAt: -1 }) // get the latest at the top
            .populate({
                path: 'from',
                select: 'username profileImg',
            });

        if (notifications.length === 0) {
            return res.status(200).json([]);
        }

        await Notification.updateMany({ to: req.user._id }, { read: true });

        return res.status(200).json(notifications);
    } catch (error) {
        console.error(`Error in getNotifications controller: ${error.message}`);
        res.status(500).json({ error: 'Server error' });
    }
};

export const deleteNotifications = async (req, res) => {
    try {
        await Notification.deleteMany({ to: req.user._id });

        return res
            .status(200)
            .json({ message: 'Notifications deleted successfully' });
    } catch (error) {
        console.error(
            `Error in deleteNotifications controller: ${error.message}`
        );
        res.status(500).json({ error: 'Server error' });
    }
};
