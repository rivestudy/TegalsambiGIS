const pool = require('../db');

/**
 * A helper function to safely parse JSON fields from a database row.
 * @param {object} row - The database row object.
 * @param {string[]} fields - An array of field names to parse.
 */
const parseJsonFields = (row, fields) => {
  for (const field of fields) {
    if (row && row[field] && typeof row[field] === 'string') {
      try {
        row[field] = JSON.parse(row[field]);
      } catch (error) {
        // If parsing fails, log the error but leave the field as is to avoid crashing.
        console.error(`Failed to parse JSON for field "${field}":`, error);
      }
    }
  }
};

exports.getAll = async (table) => {
  const [rows] = await pool.query(`SELECT * FROM ??`, [table]);
  const jsonFields = ['images', 'facilities', 'points_of_attraction', 'attraction_ids'];

  // Parse JSON fields for all returned rows
  rows.forEach(row => parseJsonFields(row, jsonFields));

  return rows;
};

exports.getById = async (table, id) => {
  const [rows] = await pool.query(`SELECT * FROM ?? WHERE id = ?`, [table, id]);
  
  if (rows[0]) {
    const row = rows[0];
    const jsonFields = ['images', 'facilities', 'points_of_attraction', 'attraction_ids'];
    
    // Parse JSON fields for the single row
    parseJsonFields(row, jsonFields);
    
    return row;
  }

  return null;
};

exports.create = async (table, data) => {
  // Stringify any fields that are meant to be stored as JSON
  if (data.facilities) data.facilities = JSON.stringify(data.facilities);
  if (data.points_of_attraction) data.points_of_attraction = JSON.stringify(data.points_of_attraction);
  if (data.images) data.images = JSON.stringify(data.images);
  if (data.attraction_ids) data.attraction_ids = JSON.stringify(data.attraction_ids); // ✅ Handle pakets field

  let query, values;

  if (table === 'attractions' || table === 'accommodations') {
    query = `INSERT INTO ?? (category, name, description, price, time_open_close, facilities, points_of_attraction, phone, email, instagram, location, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    values = [table, data.category, data.name, data.description, data.price, data.time_open_close, data.facilities, data.points_of_attraction, data.phone, data.email, data.instagram, data.location, data.images];
  } else if (table === 'facilities') {
    query = `INSERT INTO ?? (name, description, facilities, location, images) VALUES (?, ?, ?, ?, ?)`;
    values = [table, data.name, data.description, data.facilities, data.location, data.images];
  } else if (table === 'pakets') { // ✅ Add logic for 'pakets' table
    query = `INSERT INTO ?? (name, description, price, attraction_ids, accommodation_id, images) VALUES (?, ?, ?, ?, ?, ?)`;
    values = [table, data.name, data.description, data.price, data.attraction_ids, data.accommodation_id, data.images];
  } else {
    throw new Error('Invalid table for creation');
  }

  const [result] = await pool.query(query, values);
  return result.insertId;
};

exports.update = async (table, id, data) => {
  if (Object.keys(data).length === 0) {
    return false;
  }

  // Stringify any fields that are meant to be stored as JSON
  if (data.facilities) data.facilities = JSON.stringify(data.facilities);
  if (data.points_of_attraction) data.points_of_attraction = JSON.stringify(data.points_of_attraction);
  if (data.images && typeof data.images !== 'string') data.images = JSON.stringify(data.images);
  if (data.attraction_ids) data.attraction_ids = JSON.stringify(data.attraction_ids); // ✅ Handle pakets field

  const fields = Object.keys(data);
  const setClauses = fields.map(field => `\`${field}\` = ?`).join(', '); // Use backticks for safety
  const values = Object.values(data);

  const query = `UPDATE ?? SET ${setClauses} WHERE id = ?`;
  const [result] = await pool.query(query, [table, ...values, id]);

  return result.affectedRows > 0;
};

exports.delete = async (table, id) => {
  const [result] = await pool.query(`DELETE FROM ?? WHERE id = ?`, [table, id]);
  return result.affectedRows > 0;
};