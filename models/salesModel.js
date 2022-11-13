const connection = require('./connection');

const create = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
  const [{ insertId }] = await connection.execute(query);
  return insertId;
};

const addProductToSale = async (saleId, productId, quantity) => {
  const query = (
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)'
  );

  await connection.execute(query, [saleId, productId, quantity]);

  return { productId, quantity };
};

const getAll = async () => {
  const query = `SELECT 
  sales.id AS saleId, sales.date, products.id AS productId, sales_products.quantity
  FROM StoreManager.sales AS sales
  LEFT JOIN StoreManager.sales_products AS sales_products ON sales.id = sales_products.sale_id
  LEFT JOIN StoreManager.products AS products ON sales_products.product_id = products.id`;
  const [rows] = await connection.execute(query);

  return rows;
};

const getById = async (id) => {
  const query = `SELECT
  sales.date, products.id AS productId, sales_products.quantity
  FROM StoreManager.sales AS sales
  LEFT JOIN StoreManager.sales_products AS sales_products ON sales.id = sales_products.sale_id
  LEFT JOIN StoreManager.products AS products ON sales_products.product_id = products.id
  WHERE sales.id = ?`;
  const [rows] = await connection.execute(query, [id]);

  return rows;
};

module.exports = { create, addProductToSale, getAll, getById };