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

const create = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [{ insertId }] = await connection.execute(query, [name]);
  return insertId;
};

const update = async (name, id) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE ? = 1';
  await connection.execute(query, [name, id]);

  return { name, id };
};

module.exports = { getAll, getById, create, update };