const Notification = require("./NotificationModel");

// Get all notifications
const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        return res.status(200).json({ notifications });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Add a new notification
const addNotification = async (req, res) => {
    const { vehicleNumber, date, partReplace, repairCost, employeeID, employeeName } = req.body;

    const notification = new Notification({
        vehicleNumber,
        date,
        partReplace,
        repairCost,
        employeeID,
        employeeName,
    });

    try {
        await notification.save();
        return res.status(201).json({ notification });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Unable to add notification" });
    }
};

// Get notification by ID
const getNotificationById = async (req, res) => {
    const { id } = req.params;

    try {
        const notification = await Notification.findById(id);
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        return res.status(200).json({ notification });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete a notification
const deleteNotification = async (req, res) => {
    const { id } = req.params;

    try {
        const notification = await Notification.findByIdAndDelete(id);
        if (!notification) {
            return res.status(404).json({ message: "Unable to delete notification" });
        }
        return res.status(200).json({ message: "Notification deleted successfully", notification });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getAllNotifications,
    addNotification,
    getNotificationById,
    deleteNotification,
};
