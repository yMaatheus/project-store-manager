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

module.exports = { create };