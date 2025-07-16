const DataModel = require('../models/dataModel');
const fs = require('fs');
const path = require('path');

// ...

// Map URL parameter 'type' to a database table name.
const typeMap = {
  attraction: 'attractions',
  accommodation: 'accommodations',
  facility: 'facilities',
  paket: 'pakets', // ✅ ADD THIS LINE
};

// ...

function getTableFromType(type) {
  const tableName = typeMap[type];
  if (!tableName) {
    const err = new Error('Invalid type specified');
    err.status = 400;
    throw err;
  }
  return tableName;
}

// ✅ Updated helper to handle arrays of objects
function deleteImageFiles(imagesArray) {
    if (!Array.isArray(imagesArray) || imagesArray.length === 0) return;

    // Extract filenames from the array of objects
    const filenames = imagesArray.map(img => img.dir);

    filenames.forEach(file => {
        if (!file) return; // Skip if a file path is not defined
        const filePath = path.join(__dirname, '..', 'uploads', file);
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) console.error(`Failed to delete file: ${filePath}`, err);
            });
        }
    });
}

// No changes needed for getAllItems & getItemById
exports.getAllItems = async (req, res) => {
  const { type } = req.params;
  try {
    const table = getTableFromType(type);
    const data = await DataModel.getAll(table);
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

// ✅ Updated createItem to build the new JSON structure
exports.createItem = async (req, res) => {
  const { type } = req.params;
  try {
    const table = getTableFromType(type);
    const data = req.body;

    // If files are uploaded, map them to the new object structure
    if (req.files && req.files.length > 0) {
        data.images = req.files.map((file, index) => ({
            id: index + 1, // Simple sequential ID
            dir: file.filename
        }));
    }

    const id = await DataModel.create(table, data);
    res.status(201).json({ message: 'Item created successfully', id });
  } catch (err) {
    // If error, delete uploaded files
    if (req.files && req.files.length > 0) {
        const filenamesToDelete = req.files.map(file => ({ dir: file.filename }));
        deleteImageFiles(filenamesToDelete);
    }
    res.status(err.status || 500).json({ message: err.message });
  }
};

// ✅ Updated updateItem to handle the new structure
exports.updateItem = async (req, res) => {
  const { type, id } = req.params;
  try {
    const table = getTableFromType(type);
    const data = req.body;

    const existingItem = await DataModel.getById(table, id);
    if (!existingItem) {
        if (req.files && req.files.length > 0) {
            const tempImages = req.files.map(f => ({ dir: f.filename }));
            deleteImageFiles(tempImages);
        }
        return res.status(404).json({ message: 'Item not found' });
    }

    if (req.files && req.files.length > 0) {
        // Delete old image files
        if (existingItem.images) {
             deleteImageFiles(existingItem.images);
        }
        // Add new image files with the new structure
        data.images = req.files.map((file, index) => ({
            id: index + 1,
            dir: file.filename
        }));
    }

    const updated = await DataModel.update(table, id, data);
    if (!updated) return res.status(404).json({ message: 'No changes made' });

    res.json({ message: 'Item updated successfully' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};


// ✅ Updated deleteItem to use the new helper function
exports.deleteItem = async (req, res) => {
  const { type, id } = req.params;
  try {
    const table = getTableFromType(type);

    const itemToDelete = await DataModel.getById(table, id);
    if (!itemToDelete) {
        return res.status(404).json({ message: 'Item not found' });
    }

    const deleted = await DataModel.delete(table, id);
    if (!deleted) {
        return res.status(404).json({ message: 'Item not found during deletion' });
    }

    // If DB deletion is successful, delete associated image files
    if (itemToDelete.images) {
        deleteImageFiles(itemToDelete.images);
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};