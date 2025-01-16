const Order = require("./Ordermodel.js");

// Display all orders
const getAllOrders = async (req, res, next) => {
  let orders;
  try {
    // Retrieve all orders from the database
    orders = await Order.find();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }

  // If no orders found, return a 404 error
  if (!orders) {
    return res.status(404).json({ message: "Orders not found" });
  }

  // Successfully return orders
  return res.status(200).json({ orders });
};

//insert data
const addorders = async (req, res, next) =>{

    const {Driver_ID,Driver_Name,Vehicle_NO,Item_ID,Item_Name,Size,Type} = req.body;

    let orders;

    try {
        orders = new Order({Driver_ID,Driver_Name,Vehicle_NO,Item_ID,Item_Name,Size,Type});
        await orders.save();
    }catch (err){
        console.log(err);
    }

    //not insert orders
    if(!orders){
        return res.status(404).json({message:"unable to add orders"});
    }
    return res.status(200).json({ orders});
};

//get by id
const getById = async (req, res, next) =>{

    const id = req.params.id;

    let order;

    try{
     order = await Order.findById(id);
    }catch (err) {
        console.log(err);
    }
    //not available orders
    if(!order){
        return res.status(404).json({message:"order Not Found"});
    }
    return res.status(200).json({ order});
};

//Delete orders
const deleteorder = async (req, res, next) => {
    const id = req.params.id;

    let order;

    try{
        order = await Order.findByIdAndDelete(id)
    }catch (err){
        console.log(err);
    }

     //unable to delete orders
     if(!order){
        return res.status(404).json({message:"unable to delete order details"});
    }
    return res.status(200).json({ order});
};

exports.getAllOrders = getAllOrders;
exports.addorders = addorders;
exports.getById = getById;
exports.deleteorder = deleteorder;
