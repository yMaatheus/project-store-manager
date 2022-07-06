const { productsModel } = require('../models');

const getAll = async () => {
  const products = await productsModel.getAll();
  if (!products || products.length === 0) return null;
  return products;
};

const getById = async (id) => {
  if (!id || typeof id !== 'number') return null;
  const product = await productsModel.getById(id);
  return product[0];
};

module.exports = { getAll, getById };