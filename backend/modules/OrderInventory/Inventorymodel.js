const mongoose = require("mongoose");
const schema = mongoose.Schema;

const inventoryschema = new schema({
       Item_ID:{
         type:String,
         required:true,//validate
       },
       Item_Name:{
        type:String,
        required:true,//validate
      },
      Size:{
        type:String,
        required:true,//validate
      },
      Type:{
        type:String,
        required:true,//validate
      },
      Price:{
        type:Number,
        required:true,//validate
      },
      Stock_Count:{
        type:String,
        required:true,//validate
      }
});

module.exports = mongoose.model(
    "orderinventry",
     inventoryschema
)