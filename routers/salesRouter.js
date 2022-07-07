const express = require('express');

const { salesController } = require('../controllers');
const salesMiddleware = require('../middlewares/salesMiddleware');

const router = express.Router();

router.post('/', salesMiddleware.checkSale, salesController.create);

module.exports = router;