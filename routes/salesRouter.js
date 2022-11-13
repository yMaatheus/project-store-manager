const express = require('express');

const { salesController } = require('../controllers');
const salesMiddleware = require('../middlewares/salesMiddleware');

const router = express.Router();

router.post('/', salesMiddleware.checkSale, salesController.create);
router.get('/', salesController.getAll);
router.get('/:id', salesController.getById);

module.exports = router;