const connection = require('../database/connection');

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

module.exports = { create, addProductToSale };