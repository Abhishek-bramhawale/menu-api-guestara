const mongoose = require('mongoose');

const categorySchema=new mongoose.Schema(
  {
    name:{
      type: String,
      required:[true,'category name required'], // name needed
      unique:true,
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
    taxApplicability:{
      type:Boolean,
      default:false // is tax applied
    },
    tax:{
      type:Number,
      default:0,
      min:[0,'tax cannot be negative'] // no negative tax
    },
    taxType :{
      type:String,
      default:'',
      trim:true
    }
  },
  {timestamps:true} // adds createdAt& updatedAt
);


module.exports = mongoose.model('Category',categorySchema); // export
