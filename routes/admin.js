const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
//add get
router.get('/add-product', adminController.getAddProduct);
//add post
router.post('/add-product', adminController.postAddProduct);
//product list
router.get('/products', adminController.getProducts);
module.exports = router;