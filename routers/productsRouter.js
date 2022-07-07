const express = require('express');

const { productsController } = require('../controllers');

const router = express.Router();

router.get('/', productsController.getAll);

router.post('/', productsController.create);

router.get('/:id', productsController.getById);

module.exports = router;