const { salesModel, productsModel } = require('../models');
const errorUtil = require('../utils/error.util');

const checkProducts = async (products) => {
  if (!products || products.length === 0) return true;

  const promises = await Promise.all(
    products.map(({ productId }) => productsModel.getById(productId)),
  );

  if (promises.some((promise) => promise.length === 0)) return true;

  return false;
};

const create = async (products) => {
  const error = await checkProducts(products);

  if (error) return null;

  const saleId = await salesModel.create();

  const values = await Promise.all(
    products.map(({ productId, quantity }) =>
      salesModel.addProductToSale(saleId, productId, quantity)),
  );

  return { id: saleId, itemsSold: values };
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  if (!sales || sales.length === 0) return null;

  return sales;
};

const getById = async (id) => {
  if (!id || typeof id !== 'number') return null;

  const sales = await salesModel.getById(id);

  if (!sales || sales.length === 0) return null;

  return sales;
};

const exclude = async (id) => {
  if (!id || typeof id !== 'number') return null;

  const affectedRows = await salesModel.exclude(id);

  if (!affectedRows) throw errorUtil(404, 'Sale not found');
};

module.exports = { create, getAll, getById, exclude };