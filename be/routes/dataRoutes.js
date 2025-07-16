const express = require('express');
const router = express.Router();
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} = require('../controllers/dataController');

const authenticateToken = require('../middlewares/authMiddleware.js');
const upload = require('../middlewares/uploadMiddleware.js'); // ✅ Import upload middleware

// Public routes
router.get('/:type', getAllItems);
router.get('/:type/:id', getItemById);

// Protected routes with image upload handling
// The `upload.array('images', 10)` middleware will process up to 10 files
// uploaded with the field name 'images'.
router.post('/:type', authenticateToken, upload.array('images', 10), createItem);
router.put('/:type/:id', authenticateToken, upload.array('images', 10), updateItem);
router.delete('/:type/:id', authenticateToken, deleteItem);

module.exports = router;