const DataModel = require('../models/dataModel');

const typeMap = {
  attraction: { table: 'attractions', hasPrice: true },
  accommodation: { table: 'accommodations', hasPrice: true },
  facilities: { table: 'facilities', hasPrice: false },
};

function getTableInfo(type) {
  const info = typeMap[type];
  if (!info) {
    const err = new Error('Invalid type');
    err.status = 400;
    throw err;
  }
  return info;
}

exports.getAllItems = async (req, res) => {
  const { type } = req.params;
  try {
    const { table } = getTableInfo(type);
    const data = await DataModel.getAll(table);
    res.json(data);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.getItemById = async (req, res) => {
  const { type, id } = req.params;
  try {
    const { table } = getTableInfo(type);
    const item = await DataModel.getById(table, id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.createItem = async (req, res) => {
  const { type } = req.params;
  const { name, category, description, price, image } = req.body;

  try {
    const { table, hasPrice } = getTableInfo(type);
    const itemData = {
      name,
      category,
      description,
      price: hasPrice ? price : null,
      image
    };

    const id = await DataModel.create(table, itemData, hasPrice);
    res.status(201).json({ message: 'Item created', id });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.updateItem = async (req, res) => {
  const { type, id } = req.params;
  const { name, category, description, price, image } = req.body;

  try {
    const { table, hasPrice } = getTableInfo(type);
    const itemData = {
      name,
      category,
      description,
      price: hasPrice ? price : null,
      image
    };

    const updated = await DataModel.update(table, id, itemData, hasPrice);
    if (!updated) return res.status(404).json({ message: 'Item not found or no change' });

    res.json({ message: 'Item updated' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  const { type, id } = req.params;
  try {
    const { table } = getTableInfo(type);
    const deleted = await DataModel.delete(table, id);
    if (!deleted) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};
