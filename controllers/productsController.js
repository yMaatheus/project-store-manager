const { productsService } = require('../services');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();

  if (!products) return res.status(404).json({ message: 'Products not found' });

  res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const product = await productsService.getById(+id);

  if (!product) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(product);
};

const create = async (req, res, next) => {
  const { name } = req.body;

  const product = await productsService.create(name);

  if (!product) return next(new Error('Não foi possivel criar um produto.'));

  res.status(201).json(product);
};

module.exports = { getAll, getById, create };