const express = require('express');

const { productsController } = require('../controllers');
const productsMiddleware = require('../middlewares/productsMiddleware');

const router = express.Router();

router.get('/', productsController.getAll);

router.post('/', productsMiddleware.checkName, productsController.create);

router.get('/:id', productsController.getById);

module.exports = router;