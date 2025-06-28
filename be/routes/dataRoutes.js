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

// Public routes
router.get('/:type', getAllItems);
router.get('/:type/:id', getItemById);

// Protected routes
router.post('/:type', authenticateToken, createItem);
router.put('/:type/:id', authenticateToken, updateItem);
router.delete('/:type/:id', authenticateToken, deleteItem);

module.exports = router;
