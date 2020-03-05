const Product = require('../models/product');
const Order = require('../models/order');
exports.getIndex = (req, res, next) => {
    Product.find()
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
    Product.find()
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
    req.user
        .populate('cart.items.productId')
        .execPopulate()

        .then(user => {
            const products = user.cart.items;
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
            res.redirect('/');
        })
}

exports.getOrders = (req, res, next) => {
    Order.find({ 'userId': req.user._id })
        .then(orders => {
            console.log('orders');
            console.log(orders);
            res.render('shop/orders.ejs', {
                pageTitle: 'Order',
                path: '/order',
                orders: orders
            })

        })
        .catch(err => {
            console.log(err);
        })
}

exports.postDeleteCartItem = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId);
    req.user.deleteCartItem(prodId);
    console.log(prodId);
    res.redirect('/cart');
}

exports.postOrders = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(i => {
                return { quantity: i.quantity, product: { ...i.productId } }
            })
            const order = new Order({
                products: products,
                userId: req.user._id
            })
            return order.save();

        }).then(result => {
            req.user.clearCart();
        })
        .then(result => {

            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        })
}
