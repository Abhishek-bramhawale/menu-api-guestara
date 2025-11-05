const express=require('express')
const router=express.Router()

const {
  createCategory,
  getAllCategories,
  getCategoryByIdentifier,
  updateCategory
}=require('../controllers/categoryController')

// create new category
router.post('/',createCategory)

// get all categories
router.get('/',getAllCategories)

// get category by id or name
router.get('/:identifier',getCategoryByIdentifier)

// update category
router.put('/:id',updateCategory) 

module.exports=router
