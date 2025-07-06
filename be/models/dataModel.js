const pool = require('../db');

exports.getAll = async (table) => {
  const [rows] = await pool.query(`SELECT * FROM ??`, [table]);
  return rows;
};

exports.getById = async (table, id) => {
  const [rows] = await pool.query(`SELECT * FROM ?? WHERE id = ?`, [table, id]);
  return rows[0];
};

exports.create = async (table, data) => {
  // Stringify arrays for JSON fields
  if (data.facilities) data.facilities = JSON.stringify(data.facilities);
  if (data.points_of_attraction) data.points_of_attraction = JSON.stringify(data.points_of_attraction);
  if (data.images) data.images = JSON.stringify(data.images);

  let query, values;

  if (table === 'attractions' || table === 'accommodations') {
    query = `INSERT INTO ?? (category, name, description, price, time_open_close, facilities, points_of_attraction, phone, email, instagram, location, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    values = [table, data.category, data.name, data.description, data.price, data.time_open_close, data.facilities, data.points_of_attraction, data.phone, data.email, data.instagram, data.location, data.images];
  } else if (table === 'facilities') {
    query = `INSERT INTO ?? (name, description, facilities, location, images) VALUES (?, ?, ?, ?, ?)`;
    values = [table, data.name, data.description, data.facilities, data.location, data.images];
  } else {
    throw new Error('Invalid table for creation');
  }

  const [result] = await pool.query(query, values);
  return result.insertId;
};

exports.update = async (table, id, data) => {
  // Stringify arrays for JSON fields if they exist in the update data
  if (data.facilities) data.facilities = JSON.stringify(data.facilities);
  if (data.points_of_attraction) data.points_of_attraction = JSON.stringify(data.points_of_attraction);
  if (data.images) data.images = JSON.stringify(data.images);

  let fields, values;

  if (table === 'attractions' || table === 'accommodations') {
    fields = ['category = ?', 'name = ?', 'description = ?', 'price = ?', 'time_open_close = ?', 'facilities = ?', 'points_of_attraction = ?', 'phone = ?', 'email = ?', 'instagram = ?', 'location = ?', 'images = ?'];
    values = [data.category, data.name, data.description, data.price, data.time_open_close, data.facilities, data.points_of_attraction, data.phone, data.email, data.instagram, data.location, data.images, id];
  } else if (table === 'facilities') {
    fields = ['name = ?', 'description = ?', 'facilities = ?', 'location = ?', 'images = ?'];
    values = [data.name, data.description, data.facilities, data.location, data.images, id];
  } else {
    throw new Error('Invalid table for update');
  }

  const [result] = await pool.query(
    `UPDATE ?? SET ${fields.join(', ')} WHERE id = ?`,
    [table, ...values]
  );

  return result.affectedRows > 0;
};

exports.delete = async (table, id) => {
  const [result] = await pool.query(`DELETE FROM ?? WHERE id = ?`, [table, id]);
  return result.affectedRows > 0;
};