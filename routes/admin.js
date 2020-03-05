const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
// //add get
router.get('/add-product', adminController.getAddProduct);
// //add post
router.post('/add-product', adminController.postAddProduct);
// //product list
router.get('/products', adminController.getProducts);
// //delete
router.post('/delete-product', adminController.postDeleteProduct);
// //edit
router.get('/edit-product/:productId', adminController.getEditProduct);
// //post edit-product
router.post('/edit-product', adminController.postEditProduct);
module.exports = router;