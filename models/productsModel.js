const connection = require('../database/connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [rows] = await connection.execute(query);
  return rows;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [rows] = await connection.execute(query, [id]);
  return rows;
};

module.exports = { getAll, getById };