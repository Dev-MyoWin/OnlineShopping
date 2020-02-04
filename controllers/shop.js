const Product = require('../models/product');
exports.getIndex = (req, res, next) => {
    Product.fetchAll((cb) => {
        res.render('shop/index.ejs', {
            pageTitle: 'Shop',
            path: '/',
            prods: cb,
        })
    });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((cb) => {
        res.render('shop/product-list.ejs', {
            pageTitle: 'All Products',
            path: '/products',
            prods: cb,
        })
    });
};

exports.getCarts = (req, res, next) => {
    res.render('shop/cart.ejs', {
        pageTitle: 'Cart',
        path: '/cart',
    })
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders.ejs', {
        pageTitle: 'Order',
        path: '/orders',
    })
}
