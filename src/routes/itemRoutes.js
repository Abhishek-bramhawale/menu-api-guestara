const express = require('express');
const router = express.Router();
const {
  createItem,
  getAllItems,
  getItemsByCategory,
  getItemsBySubCategory,
  getItemByIdentifier,
  updateItem,
} = require('../controllers/itemController');

// POST /api/items - create a new item
router.post('/', createItem);

// GET /api/items - get all items
router.get('/', getAllItems);

// GET /api/items/category/:categoryId - Get all items under a category
router.get('/category/:categoryId', getItemsByCategory);

// GET /api/items/subcategory/:subCategoryId - get all items under a sub-category
router.get('/subcategory/:subCategoryId', getItemsBySubCategory);

// GET /api/items/:identifier - get item by ID or name
router.get('/:identifier', getItemByIdentifier);

// PUT /api/items/:id - update item
router.put('/:id', updateItem);

module.exports = router;
