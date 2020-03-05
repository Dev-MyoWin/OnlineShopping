const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');
router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/orders', shopController.getOrders);

router.get('/cart', shopController.getCarts);
router.post('/cart', shopController.postCarts);

router.post('/delete-cart-item', shopController.postDeleteCartItem);
// //order
router.post('/orders', shopController.postOrders);

module.exports = router;