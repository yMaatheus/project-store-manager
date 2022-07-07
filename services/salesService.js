const { salesModel, productsModel } = require('../models');

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
  const data = await salesModel.getAll();
  if (!data || data.length === 0) return null;

  return data;
};

const getById = async (id) => {
  if (!id || typeof id !== 'number') return null;

  const sale = await salesModel.getById(id);

  if (!sale || sale.length === 0) return null;

  return sale;
};

module.exports = { create, getAll, getById };