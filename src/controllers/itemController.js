const Item = require('../models/Item')
const Category=require('../models/Category')
const SubCategory = require('../models/SubCategory')


// create new item 
const createItem = async (req,res,next)=>{
 try{
   const { name, image, description, category, subCategory, taxApplicability, tax, baseAmount, discount } = req.body

   if(category){
      const parentCat = await Category.findById(category)
      if(!parentCat){
         return res.status(404).json({success:false, error:'category not found'})
      }
   }

   if(subCategory){
     const parentSub = await SubCategory.findById(subCategory)
     if(!parentSub){
       return res.status(404).json({ success:false, error:'sub-category not found'})
     }
   }

   if(!category && !subCategory){
     return res.status(400).json({ success:false, error:'needs category or sub-category'})
   }

   const item = await Item.create({
     name,
     image: image || '',
     description: description || '',
     category: category || null,
     subCategory: subCategory || null,
     taxApplicability: taxApplicability || false,
     tax: tax || 0,
     baseAmount,
     discount: discount || 0
   })

   await item.populate('category','name image description')
   await item.populate('subCategory','name image description')

   res.status(201).json({ success:true, data:item })
 }catch(err){
   next(err)
 }
}


// get all items 
const getAllItems = async(req,res,next)=>{
 try {
   const items = await Item.find()
     .populate('category','name image description')
     .populate('subCategory','name image description')
     .sort({ createdAt:-1 })

   res.status(200).json({ success:true, count:items.length, data:items })
 } catch(e){
   next(e)
 }
}


// items by category
const getItemsByCategory = async (req,res,next)=>{
 try{
   const { categoryId } = req.params
   const cat = await Category.findById(categoryId)
   if(!cat){
     return res.status(404).json({ success:false, error:'category not found'})
   }

   const items = await Item.find({ category:categoryId })
     .populate('category','name image description')
     .populate('subCategory','name image description')
     .sort({ createdAt:-1 })

   res.status(200).json({ success:true, count:items.length, data:items })
 }catch(e){
   next(e)
 }
}


// items by sub category
const getItemsBySubCategory = async(req,res,next)=>{
 try {
   const { subCategoryId } = req.params

   const sub = await SubCategory.findById(subCategoryId)
   if(!sub){
     return res.status(404).json({ success:false, error:'sub-category not found'})
   }

   const items = await Item.find({ subCategory: subCategoryId })
     .populate('category','name image description')
     .populate('subCategory','name image description')
     .sort({ createdAt:-1 })

   res.status(200).json({ success:true, count:items.length, data:items })
 } catch (err){
   next(err)
 }
}


// get item by id or name
const getItemByIdentifier = async (req,res,next)=>{
 try{
   const { identifier } = req.params
   const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier)
   let item

   if(isObjectId){
     item = await Item.findById(identifier)
      .populate('category','name image description')
      .populate('subCategory','name image description')
   } else {
     item = await Item.findOne({ name: { $regex: new RegExp(`^${identifier}$`,'i') } })
      .populate('category','name image description')
      .populate('subCategory','name image description')
   }

   if(!item){
     return res.status(404).json({ success:false, error:'item not found'})
   }

   res.status(200).json({ success:true, data:item })
 } catch(e){
   next(e)
 }
}


// update item 
const updateItem = async(req,res,next)=>{
 try{
   const { id } = req.params
   const { name, image, description, category, subCategory, taxApplicability, tax, baseAmount, discount } = req.body

   const item = await Item.findById(id)
   if(!item){
     return res.status(404).json({ success:false, error:'item not found'})
   }

   if(category){
     const cat = await Category.findById(category)
     if(!cat) return res.status(404).json({ success:false, error:'category not found' })
   }

   if(subCategory){
     const sub = await SubCategory.findById(subCategory)
     if(!sub) return res.status(404).json({ success:false, error:'sub-category not found' })
   }

   const finalCat = category!==undefined ? category : item.category
   const finalSub = subCategory!==undefined ? subCategory : item.subCategory

   if(!finalCat && !finalSub){
     return res.status(400).json({ success:false, error:'needs one parent'})
   }

   // update few fields
   if(name!==undefined) item.name = name
   if(image!==undefined) item.image=image
   if(description!==undefined) item.description=description
   if(category!==undefined) item.category=category||null
   if(subCategory!==undefined) item.subCategory=subCategory||null
   if(taxApplicability!==undefined) item.taxApplicability=taxApplicability
   if(tax!==undefined) item.tax=tax
   if(baseAmount!==undefined) item.baseAmount=baseAmount
   if(discount!==undefined) item.discount=discount

   await item.save()

   await item.populate('category','name image description')
   await item.populate('subCategory','name image description')

   res.status(200).json({ success:true, data:item })
 }catch(err){
   next(err)
 }
}


module.exports={
 createItem,
 getAllItems,
 getItemsByCategory,
 getItemsBySubCategory,
 getItemByIdentifier,
 updateItem
}
