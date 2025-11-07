const express = require('express');
const router = express.Router();
const { searchItemsByName } = require('../controllers/searchController');

// GET /api/search/items?name=searchTerm - Search items by name
router.get('/items', searchItemsByName);

module.exports = router;

