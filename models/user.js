const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    }

})
userSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() == product._id.toString();
    })

    let quantity = 1;
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
        const updatedQuantity = this.cart.items[cartProductIndex].quantity + 1;

        updatedCartItems[cartProductIndex].quantity = updatedQuantity;
    }
    else {
        updatedCartItems.push({ productId: product._id, quantity: quantity });
    }

    updatedCart = { items: updatedCartItems };
    this.cart = updatedCart;
    return this.save();
}
userSchema.methods.deleteCartItem = function (productId) {
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
    })

    this.cart.items = updatedCartItems;
    return this.save();
}
userSchema.methods.clearCart = function () {
    this.cart.items = [];
    return this.save();
}
module.exports = mongoose.model('User', userSchema);
// const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb');
// class User {
//     constructor(name, email, cart, id) {
//         this.name = name;
//         this.email = email;
//         this.cart = cart;//item{items[]}
//         this._id = id;
//     }
//     save() {

//         const db = getDb();
//         let dbOp;

//         dbOp = db.collection('users').insertOne(this)

//         return dbOp
//             .then(result => {
//                 console.log(result);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     addToCart(product) {
//         const db = getDb();
//         let updatedCart;
//         if (this.cart == undefined) {
//             updatedCart = { items: [{ productId: new mongodb.ObjectId(product._id), quantity: 1 }] };

//         }
//         else {
//             const cartProductIndex = this.cart.items.findIndex(cp => {
//                 return cp.productId.toString() == product._id.toString();
//             })

//             let quantity = 1;
//             const updatedCartItems = [...this.cart.items];
//             if (cartProductIndex >= 0) {
//                 const updatedQuantity = this.cart.items[cartProductIndex].quantity + 1;

//                 updatedCartItems[cartProductIndex].quantity = updatedQuantity;
//             }
//             else {
//                 updatedCartItems.push({ productId: product._id, quantity: quantity });
//             }

//             updatedCart = { items: updatedCartItems };

//         }

//         return db.collection('users').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: updatedCart } });

//     }
//     getCart() {
//         const db = getDb();
//         if (this.cart === undefined) {
//             return db.collection('users').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: { items: [] } } });
//             let products = [];
//             return products;
//         }
//         else {
//             const productIds = this.cart.items.map(item => {
//                 return item.productId;
//             })
//             console.log(productIds);
//             return db.collection('products').find({ _id: { $in: productIds } }).toArray()
//                 .then(products => {
//                     return products.map(p => {
//                         return {
//                             ...p, quantity: this.cart.items.find(item => {
//                                 return item.productId.toString() === p._id.toString();
//                             }).quantity
//                         }
//                     })
//                 })
//                 .catch(err => {
//                     console.log(err);
//                 })

//         }
//     }

//     deleteCartItem(productId) {
//         const db = getDb();
//         const updatedCartItems = this.cart.items.filter(item => {
//             return item.productId.toString() !== productId.toString();
//         })
//         return db.collection('users').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: { items: updatedCartItems } } });
//     }

//     addOrder() {
//         const db = getDb();
//         return this.getCart()
//             .then(products => {
//                 const order = {
//                     items: products,
//                     user: {
//                         _id: this._id,
//                         name: this.name
//                     }
//                 }
//                 return db.collection('orders').insertOne(order);
//             }).then(result => {
//                 return db.collection('users').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: { items: [] } } })
//             })
//     }
//     getOrder() {
//         const db = getDb();
//         return db.collection('orders').find({ 'user._id': new mongodb.ObjectId(this._id) }).toArray()
//             .then(orders => {
//                 return orders;
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     }

//     static findById(userId) {
//         const db = getDb();
//         return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId) })
//             .then(user => {
//                 return user;
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     }

// }
// module.exports = User;
