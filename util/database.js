const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
//Connection with mogodb
const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://admin:admin123@onlineshop-mfcet.mongodb.net/onlineshop')
        .then(client => {
            console.log("connected....")
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;