const DataModel = require('../models/dataModel');

// Map URL parameter 'type' to a database table name.
const typeMap = {
  attraction: 'attractions',
  accommodation: 'accommodations',
  facility: 'facilities', // Changed from plural 'facilities' to singular 'facility' for a cleaner API endpoint
};

function getTableFromType(type) {
  const tableName = typeMap[type];
  if (!tableName) {
    const err = new Error('Invalid type specified');
    err.status = 400;
    throw err;
  }
  return tableName;
}

exports.getAllItems = async (req, res) => {
  const { type } = req.params;
  try {
    const table = getTableFromType(type);
    const data = await DataModel.getAll(table);
    // When retrieving from DB, JSON fields are parsed automatically by the driver
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.getItemById = async (req, res) => {
  const { type, id } = req.params;
  try {
    const table = getTableFromType(type);
    const item = await DataModel.getById(table, id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.createItem = async (req, res) => {
  const { type } = req.params;
  try {
    const table = getTableFromType(type);
    // Pass the entire request body to the model
    const id = await DataModel.create(table, req.body);
    res.status(201).json({ message: 'Item created successfully', id });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.updateItem = async (req, res) => {
  const { type, id } = req.params;
  try {
    const table = getTableFromType(type);
    // Pass the entire request body to the model for updating
    const updated = await DataModel.update(table, id, req.body);
    if (!updated) return res.status(404).json({ message: 'Item not found or no changes made' });
    res.json({ message: 'Item updated successfully' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  const { type, id } = req.params;
  try {
    const table = getTableFromType(type);
    const deleted = await DataModel.delete(table, id);
    if (!deleted) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};