const pool = require('../db');

exports.findByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

exports.findByEmailOrUsername = async (email, username) => {
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE email = ? OR username = ?',
    [email, username]
  );
  return rows;
};

exports.create = async (username, email, hashedPassword, name) => {
  const [result] = await pool.query(
    'INSERT INTO users (username, email, password, name) VALUES (?, ?, ?, ?)',
    [username, email, hashedPassword, name || null]
  );
  return result.insertId;
};
