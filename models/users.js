const mongoose = require('mongoose');
const config = require('../config/config.js');

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone:{
        type: Number, 
        require: true
    }
});

const Customer = module.exports = mongoose.model('Customer', customerSchema);

module.exports.getUserById = function(id, callback) {
    Customer.findById(id, callback);
}

module.exports.getUserByName = function(name, callback) {
    const query = {name: name};
    Customer.findOne(query, callback);
}

module.exports.addCustomer = function(newuser, callback){
    newuser.save(callback);
}
