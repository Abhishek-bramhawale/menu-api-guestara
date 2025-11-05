const mongoose = require('mongoose');

const subCategorySchema=new mongoose.Schema(
  {
    name:{
      type:String,
      required:[true,'sub-category name required'], // name needed
      trim:true
    },
    image :{
      type:String,
      default:'',// optional image
      trim:true
    },
    description:{
      type:String,
      default:'', // optional desc
      trim:true
    },
    category:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Category',
      required:[true,'category ref required'] // link to category
    },
    taxApplicability:{
      type:Boolean,
      default:false // is tax applied
    },
    tax:{
      type:Number,
      default:0,
      min:[0,'tax cannot be negative'] // no negative tax
    }
  },
  {timestamps:true} // adds createdAt updatedAt
);

subCategorySchema.index({name:1}); // faster search 
subCategorySchema.index({category:1}); 

module.exports=mongoose.model('SubCategory',subCategorySchema); 
