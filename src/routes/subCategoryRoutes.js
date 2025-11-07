const express = require('express')
const router = express.Router()

const{ 
 createSubCategory,
 getAllSubCategories,
 getSubCategoriesByCategory,
 getSubCategoryByIdentifier,
 updateSubCategory
} = require('/controllers/subCategoryController')

router.post('/',  createSubCategory )  //create new sub-category

router.get( '/', getAllSubCategories ) //get all subcategories

router.get('/category/:categoryId' ,getSubCategoriesByCategory) //get subcategories under a specific category

router.get('/:identifier',  getSubCategoryByIdentifier ) //get by id or name (identifier can be both)

router.put('/:id' ,updateSubCategory) //update existing subcat

module.exports = router
