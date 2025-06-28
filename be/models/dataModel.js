const pool = require('../db');

exports.getAll = async (table) => {
  const [rows] = await pool.query(`SELECT * FROM ??`, [table]);
  return rows;
};

exports.getById = async (table, id) => {
  const [rows] = await pool.query(`SELECT * FROM ?? WHERE id = ?`, [table, id]);
  return rows[0];
};

exports.create = async (table, data, hasPrice) => {
  const { name, category, description, price, image } = data;

  const query = hasPrice
    ? `INSERT INTO ?? (name, category, description, price, image) VALUES (?, ?, ?, ?, ?)`
    : `INSERT INTO ?? (name, category, description, image) VALUES (?, ?, ?, ?)`;

  const values = hasPrice
    ? [table, name, category, description, price, image]
    : [table, name, category, description, image];

  const [result] = await pool.query(query, values);
  return result.insertId;
};

exports.update = async (table, id, data, hasPrice) => {
  const { name, category, description, price, image } = data;

  const fields = hasPrice
    ? ['name = ?', 'category = ?', 'description = ?', 'price = ?', 'image = ?']
    : ['name = ?', 'category = ?', 'description = ?', 'image = ?'];

  const values = hasPrice
    ? [name, category, description, price, image, id]
    : [name, category, description, image, id];

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
