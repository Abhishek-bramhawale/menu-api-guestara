const Item = require('../models/Item');

// Search items by name
const searchItemsByName = async (req, res, next) => {
  try {
    const { name } = req.query;

    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Search name is required',
      });
    }

    const items = await Item.find({
      name: { $regex: name, $options: 'i' },
    })
      .populate('category', 'name image description')
      .populate('subCategory', 'name image description')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      searchTerm: name,
      data: items,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchItemsByName,
};

