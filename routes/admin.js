const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
//add get
router.get('/add-product', productController.getAddProduct);
//add post
router.post('/add-product', productController.postAddProduct);

module.exports = router;