const Category=require('../models/Category')
const mongoose=require('mongoose')

// create new category
const createCategory=async(req,res,next)=>{
  try{
    const {name,image,description,taxApplicability,tax,taxType}=req.body

    const category=await Category.create({
      name,
      image: image || '', // optional
      description:description||'',
      taxApplicability: taxApplicability|| false,
      tax:tax||0,
      taxType: taxType || ''
    }) 

    res.status(201).json({
      success:true,
      data:category
    }) 
  }catch(err){
    next(err) 
  }
}

// get all categories
const getAllCategories= async(req,res,next)=>{
  try{
    const categories= await Category.find().sort({createdAt:-1}) // newest first

    res.status(200).json({
      success:true,
      count:categories.length,
      data:categories
    })
  }catch(error){
    next(error)
  }
}

// get category by id or name
const getCategoryByIdentifier=async(req,res,next)=>{
  try{
    const {identifier}=req.params

    let category
    if(mongoose.isValidObjectId(identifier)){ // check if objectId
      category=await Category.findById(identifier)
    }else 
      category=await Category.findOne({name:{$regex:new RegExp(`^${identifier}$`,'i')}}) // search by name

    if(!category){
      return res.status(404).json({
        success:false,
        error:'category not found'
      })
    }

    res.status(200).json({
      success:true,
      data:category
    })
  }catch(err){
    next(err)
  }
}

// update category
const updateCategory=async(req,res,next)=>{
  try{
    const {id}=req.params
    const {name,image,description,taxApplicability,tax,taxType}=req.body

    const category=await Category.findById(id)

    if(!category){
      return res.status(404).json({
        success:false,
        error:'category not found'
      })
    }

    // update fields if provided
    if(name!==undefined) category.name=name
    if(image!==undefined) category.image=image 
    if(description!==undefined) category.description=description
    if(taxApplicability!==undefined) category.taxApplicability=taxApplicability
    if(tax!==undefined) category.tax=tax
    if(taxType!==undefined) category.taxType=taxType

    await category.save()

    res.status(200).json({
      success:true,
      data:category
    })
  }catch(err){
    next(err)
  }
}

module.exports={
  createCategory,
  getAllCategories,
  getCategoryByIdentifier,
  updateCategory
}
