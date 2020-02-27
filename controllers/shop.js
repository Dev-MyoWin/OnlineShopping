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
    req.user.getCart().then(products => {
        res.render('shop/cart.ejs', {
            pageTitle: 'Cart',
            path: '/cart',
            prods: products
        })

    })
        .catch(err => {
            console.log(err);
        })

}
exports.postCarts = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId)
        .then(product => {
            return req.user.addToCart(product)
        })
        .then(result => {
            console.log(result);
            res.redirect('/cart');
        })
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders.ejs', {
        pageTitle: 'Order',
        path: '/orders',
    })
}
exports.postDeleteCartItem = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId);
    req.user.deleteCartItem(prodId);
    console.log(prodId);
    res.redirect('/cart');
}
