const Product = require('../models/product');
exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/index.ejs', {
                pageTitle: 'Shop',
                path: '/',
                prods: products,
            })
        })
        .catch(err => {
            console.log(err)
        })

};


exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/product-list.ejs', {
                pageTitle: 'All Products',
                path: '/products',
                prods: products,
            })
        })
        .catch(err => {
            console.log(err)
        })
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;// to call prameter use "params"
    Product.findById(prodId)
        .then(product => {
            res.render('shop/product-detail.ejs', {
                pageTitle: "Product Detail",
                path: "/products",
                product: product
            })
        })
        .catch(err => {
            console.log(err)
        })
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
