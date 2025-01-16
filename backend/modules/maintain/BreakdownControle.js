const Breakdown = require("./BreakdownModel");
const Notification = require("./NotificationModel.js");


// Display all breakdowns
const getAllBreakdowns = async (req, res) => {
    try {
        const breakdowns = await Breakdown.find();
        return res.status(200).json({ breakdowns });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


  
    // Add a new breakdown
    const addBreakdown = async (req, res) => {
        const { vehicleNumber, date, partReplace, repairCost, employeeID, employeeName } = req.body;
    
        const breakdown = new Breakdown({
            vehicleNumber,
            date,
            partReplace,
            repairCost,
            employeeID,
            employeeName,
        });
    
        try {
            // Save the breakdown to the database
            const newBreakdown = await breakdown.save();
    
            // Create a notification related to this breakdown
            const notification = new Notification({
                vehicleNumber,
                date: new Date(), // Use current date for notification
                partReplace,
                repairCost,
                employeeID,
                employeeName,
            });
            await notification.save();
    
            return res.status(201).json({ breakdown: newBreakdown, message: "Breakdown and notification created" });
        } catch (err) {
            console.error(err);
            return res.status(400).json({ message: "Unable to add breakdown and notification" });
        }
    };
    

    


// Get breakdown by ID
const getById = async (req, res) => {
    const { id } = req.params;

    try {
        const breakdown = await Breakdown.findById(id);
        if (!breakdown) {
            return res.status(404).json({ message: "Breakdown not found" });
        }
        return res.status(200).json({ breakdown });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update breakdown details
const updateBreakdown = async (req, res) => {
    const { id } = req.params;
    const { vehicleNumber, date, partReplace, repairCost, employeeID, employeeName } = req.body;

    try {
        const breakdown = await Breakdown.findByIdAndUpdate(
            id,
            { vehicleNumber, date, partReplace, repairCost, employeeID, employeeName },
            { new: true } // Return the updated document
        );

        if (!breakdown) {
            return res.status(404).json({ message: "Unable to update breakdown" });
        }

        return res.status(200).json({ breakdown });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete breakdown details
const deleteBreakdown = async (req, res) => {
    const { id } = req.params;

    try {
        const breakdown = await Breakdown.findByIdAndDelete(id);
        if (!breakdown) {
            return res.status(404).json({ message: "Unable to delete breakdown" });
        }
        return res.status(200).json({ message: "Breakdown deleted successfully", breakdown });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getAllBreakdowns,
    addBreakdown,
    getById,
    updateBreakdown,
    deleteBreakdown,
};
