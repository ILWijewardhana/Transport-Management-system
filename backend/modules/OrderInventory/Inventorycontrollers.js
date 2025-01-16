const Inventory = require("../inventory/model.js");
//display data
const getAllInventories = async (req, res, next) => {
    let Inventories;
    // get all users
    try{
        inventories = await Inventory.find();
    }catch (err) {
        console.log(err);
    }
    // not found
    if (!inventories){
        return res.status(404).json({message:"user not found"});
    }

    //display all inventories
    return res.status(200).json({ inventories});
};

//insert data
const addinventories = async (req, res, next) =>{

    const {Item_ID,Item_Name,Size,Type,Price,Stock_Count} = req.body;

    let inventories;

    try {
        inventories = new Inventory({Item_ID,Item_Name,Size,Type,Price,Stock_Count});
        await inventories.save();
    }catch (err){
        console.log(err);
    }

    //not insert inventories
    if(!inventories){
        return res.status(404).json({message:"unable to add inventories"});
    }
    return res.status(200).json({ inventories});
};

//get by id
const getById = async (req, res, next) =>{

    const id = req.params.id;

    let inventory;

    try{
     inventory = await Inventory.findById(id);
    }catch (err) {
        console.log(err);
    }
    //not available inventories
    if(!inventory){
        return res.status(404).json({message:"user Not Found"});
    }
    return res.status(200).json({ inventory});
};

//update inventory details
const updateinventory = async (req,res,next) => {
    const id = req.params.id;
    const {Item_ID,Item_Name,Size,Type,Price,Stock_Count} = req.body;

    let inventories;

    try {
        inventories = await Inventory.findByIdAndUpdate(id,
            {Item_ID : Item_ID, Item_Name : Item_Name, Size : Size, Type : Type, Price : Price,Stock_Count : Stock_Count});
            inventories = await inventories.save();
    }catch (err) {
        console.log(err);
    }

    //unable to update inventories
    if(!inventories){
        return res.status(404).json({message:"unable to update inventory details"});
    }
    return res.status(200).json({ inventories});
};

//Delete inventories
const deleteinventory = async (req, res, next) => {
    const id = req.params.id;

    let inventory;

    try{
        inventory = await Inventory.findByIdAndDelete(id)
    }catch (err){
        console.log(err);
    }

     //unable to delete inventories
     if(!inventory){
        return res.status(404).json({message:"unable to delete inventory details"});
    }
    return res.status(200).json({ inventory});
};

exports.getAllInventories = getAllInventories;
exports.addinventories = addinventories;
exports.getById = getById;
exports.updateinventory = updateinventory;
exports.deleteinventory = deleteinventory;