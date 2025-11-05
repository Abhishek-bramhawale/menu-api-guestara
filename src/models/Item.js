const mongoose = require('mongoose');

const itemSchema=new mongoose.Schema(
  {
    name:{
      type:String,
      required:[true,'item name required'], // item name
      trim:true
    },
    image :{
      type:String,
      default:'', // optional image
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
      default:null // can belong to category
    },
    subCategory:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'SubCategory',
      default:null // can belong to subcategory
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
    baseAmount:{
      type:Number,
      required:[true,'base amount required'], 
      min:[0,'base cannot be negative'] // base price
    },
    discount:{
      type:Number,
      default:0,
      min:[0,'discount cannot be negative'] // discount
    },
    totalAmount:{
      type:Number,
      default:0 // calculated
    }
  },
  {timestamps:true} // adds createdAt updatedAt
);

itemSchema.pre('validate',function(next){
  if(!this.category && !this.subCategory){ 
    this.invalidate('category','item must belong to either category or sub-category') // validation
  }
  next()
});

itemSchema.pre('save',function(next){
  this.totalAmount=this.baseAmount - this.discount // calc total
  next()
});

itemSchema.index({name:1}); // faster search
itemSchema.index({category:1});
itemSchema.index({subCategory:1});

module.exports=mongoose.model('Item',itemSchema); // export
