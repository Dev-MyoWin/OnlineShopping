const fs = require('fs');
const path = require('path');

const getProductsFromFile = cb => {
    const p = path.join(path.dirname(process.mainModule.filename), 'data', 'product.json');
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        }
        cb(JSON.parse(fileContent));
    })

}
module.exports = class Product {
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    };
    save() {
        this.id = Math.random().toString();
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'product.json');
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent);
            }
            console.log(products);
            products.push(this);
            console.log(products);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }
    static fetchAll(cb) {
        getProductsFromFile(cb);

    }
    //not same cb 
    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
};
