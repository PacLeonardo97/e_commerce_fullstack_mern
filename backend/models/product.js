const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique:true
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      maxlength: 30,
      required:true
    },
    quantity: { 
      type: Number,
      required:true
     },
    sold: { 
      type: Number,
      default:0
     },
     photo:{
       data:Buffer,
       contentType:String
     },
     shipping:{
       required:false,
       type:Boolean,required:true
     }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
