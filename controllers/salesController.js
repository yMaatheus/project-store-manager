const { salesService } = require('../services');

const create = async (req, res) => {
  const products = req.body;

  const sale = await salesService.create(products);

  if (!sale) return res.status(404).json({ message: 'Product not found' });

  res.status(201).json(sale);
};

module.exports = { create };