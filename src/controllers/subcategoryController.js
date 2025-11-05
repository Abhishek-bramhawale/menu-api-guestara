const SubCategory=require('../models/SubCategory')
const Category=require('../models/Category')

// create new subcategory
const createSubCategory=async(req,res,next)=>{
  try{
    const {name,image,description,category,taxApplicability,tax}=req.body

    const parentCategory=await Category.findById(category) // check parent
    if(!parentCategory){
      return res.status(404).json({
        success:false,
        error:'category not found'
      })
    }

    const finalTaxApplicability=taxApplicability!==undefined ? taxApplicability : parentCategory.taxApplicability
    const finalTax=tax!==undefined ? tax : parentCategory.tax

    const subCategory=await SubCategory.create({
      name,
      image:image||'', 
      description:description||'',
      category,
      taxApplicability:finalTaxApplicability,
      tax:finalTax
    })

    await subCategory.populate('category','name image description') // populate parent

    res.status(201).json({
      success:true,
      data:subCategory
    })
  }catch(err){
    next(err) 
  }
}

// get all subcategories
const getAllSubCategories=async(req,res,next)=>{
  try{
    const subCategories=await SubCategory.find()
      .populate('category','name image description')
      .sort({createdAt:-1})

    res.status(200).json({
      success:true,
      count:subCategories.length,
      data:subCategories
    })
  }catch(err){
    next(err)
  }
}

// get subcategories by category id
const getSubCategoriesByCategory=async(req,res,next)=>{
  try{
    const {categoryId}=req.params
    const category=await Category.findById(categoryId)
    if(!category){
      return res.status(404).json({
        success:false,
        error:'category not found'
      })
    }

    const subCategories=await SubCategory.find({category:categoryId})
      .populate('category','name image description')
      .sort({createdAt:-1})

    res.status(200).json({
      success:true,
      count:subCategories.length,
      data:subCategories
    })
  }catch(err){
    next(err)
  }
}

// get subcategory by id or name
const getSubCategoryByIdentifier=async(req,res,next)=>{
  try{
    const {identifier}=req.params
    let subCategory
    if(mongoose.isValidObjectId(identifier)){ 
      subCategory=await SubCategory.findById(identifier).populate('category','name image description')
    }else 
      subCategory=await SubCategory.findOne({name:{$regex:new RegExp(`^${identifier}$`,'i')}})
        .populate('category','name image description') // search by name

    if(!subCategory){
      return res.status(404).json({
        success:false,
        error:'sub-category not found'
      })
    }

    res.status(200).json({
      success:true,
      data:subCategory
    })
  }catch(err){
    next(err)
  }
}

// update subcategory
const updateSubCategory=async(req,res,next)=>{
  try{
    const {id}=req.params
    const {name,image,description,category,taxApplicability,tax}=req.body

    const subCategory=await SubCategory.findById(id)
    if(!subCategory){
      return res.status(404).json({
        success:false,
        error:'sub-category not found'
      })
    }

    if(category){
      const parentCategory=await Category.findById(category)
      if(!parentCategory){
        return res.status(404).json({
          success:false,
          error:'category not found'
        })
      }
    }

    if(name!==undefined) subCategory.name=name
    if(image!==undefined) subCategory.img=image 
    if(description!==undefined) subCategory.description=description
    if(category!==undefined) subCategory.category=category
    if(taxApplicability!==undefined) subCategory.taxApplicability=taxApplicability
    if(tax!==undefined) subCategory.tax=tax

    await subCategory.save()
    await subCategory.populate('category','name image description') // populate parent

    res.status(200).json({
      success:true,
      data:subCategory
    })
  }catch(err){
    next(err)
  }
}

module.exports={
  createSubCategory,
  getAllSubCategories,
  getSubCategoriesByCategory,
  getSubCategoryByIdentifier,
  updateSubCategory
}
