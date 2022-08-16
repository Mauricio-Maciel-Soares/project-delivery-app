const express = require('express');
const sellerController = require('../../database/controllers/seller.controller');

const sellerRouter = express.Router();

sellerRouter.get('/:id/orders', sellerController.sellerOrder);
sellerRouter.get('/:id/orders/:id', sellerController.sellerOrderDetails)

module.exports = sellerRouter;