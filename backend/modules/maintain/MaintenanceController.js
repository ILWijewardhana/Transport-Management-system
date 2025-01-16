const Maintenance=require("./MaintenanceModel.js");

//data display
const getAllMaintenances=async(req, res,next) => {
    let maintenances;

    try{
        maintenances=await Maintenance.find();

    }catch (err){
        console.log(err);
    }
    //not found
    if(!maintenances){
        return res.status(404).json({message :"Services not found"});
    }

    //Display services
    return res.status(200).json({maintenances});

};



//data insert
const addMaintenances =async(req, res, next) => {
    const{serviceID, vehicleNumber, serviceDate,serviceType, serviceStatus } = req.body;

    let maintenances;

    try{
        maintenances=new Maintenance({serviceID, vehicleNumber, serviceDate,serviceType, serviceStatus});
        await maintenances.save();

    }catch(err){
        console.log(err);
    }
    //not insert maintenence
    if(!maintenances){
        return res.status(404).json({message:"unable to add service/maintenance"});
    }
    return res.status(202).json({maintenances});

};
//Get by Id
const getById = async(req, res, next)=>{
    const id =req.params.id;

    let maintenances;

    try{
        maintenances=await Maintenance.findById(id);
    }catch(err){
        console.log(err);
    }

    //not available maintenence
    if(!maintenances){
        return res.status(404).json({message:"Services not found"});
    }
    return res.status(202).json({maintenances});

};
//update maintenance details
const updateMaintenance=async(req, res, next)=>{
    const id =req.params.id;
    const{serviceID, vehicleNumber, serviceDate,serviceType, serviceStatus } = req.body;

    let maintenances;

    try{
        maintenances=await Maintenance.findByIdAndUpdate(id,
            {serviceID:serviceID, vehicleNumber:vehicleNumber, serviceDate:serviceDate,serviceType:serviceType, serviceStatus:serviceStatus });
            maintenances=await maintenances.save();
    }catch{
       
    if(!maintenances){
        return res.status(404).json({message:"Unable to update service details"});
    }
    return res.status(202).json({maintenances}); 
    }
};
//delete  maintenance details
const deleteMaintenance=async(req, res, next)=>{
    const id=req.params.id;

    let maintenances;

    try{
        maintenances=await Maintenance.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
    }
        if(!maintenances){
            return res.status(404).json({message:"Unable to delete service details"});
        }
        return res.status(202).json({maintenances}); 
    
};


exports.getAllMaintenances = getAllMaintenances;
exports.addMaintenances=addMaintenances;
exports.getById=getById;
exports.updateMaintenance=updateMaintenance;
exports.deleteMaintenance=deleteMaintenance;