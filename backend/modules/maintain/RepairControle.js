const Repair = require("./RepairModel");

// Get all repairs
const getAllRepairs = async (req, res, next) => {
    let repairs;

    try {
        repairs = await Repair.find();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to fetch repairs" });
    }

    if (!repairs) {
        return res.status(404).json({ message: "Repairs not found" });
    }

    return res.status(200).json({ repairs });
};

// Add new repair
const addRepairs = async (req, res, next) => {
    const { repairID, repairNumber, repairDate, partReplace, repairCost, repairStatus } = req.body;
    
    let repair;

    try {
        repair = new Repair({ repairID, repairNumber, repairDate, partReplace, repairCost, repairStatus });
        await repair.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to add repair" });
    }

    return res.status(201).json({ repair });
};

// Get repair by ID
const getById = async (req, res, next) => {
    const id = req.params.id;

    let repair;

    try {
        repair = await Repair.findById(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to find repair" });
    }

    if (!repair) {
        return res.status(404).json({ message: "Repair not found" });
    }

    return res.status(200).json({ repair });
};

// Update repair details
const updateRepair = async (req, res, next) => {
    const id = req.params.id;
    const { repairID, repairNumber, repairDate, partReplace, repairCost, repairStatus } = req.body;

    let repair;

    try {
        repair = await Repair.findByIdAndUpdate(id, {
            repairID,
            repairNumber,
            repairDate,
            partReplace,
            repairCost,
            repairStatus
        }, { new: true });

        if (!repair) {
            return res.status(404).json({ message: "Unable to update repair" });
        }

        return res.status(200).json({ repair });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to update repair" });
    }
};

// Delete repair
const deleteRepair = async (req, res, next) => {
    const id = req.params.id;

    let repair;

    try {
        repair = await Repair.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to delete repair" });
    }

    if (!repair) {
        return res.status(404).json({ message: "Repair not found" });
    }

    return res.status(200).json({ message: "Repair deleted" });
};

module.exports = {
    getAllRepairs,
    addRepairs,
    getById,
    updateRepair,
    deleteRepair
};
