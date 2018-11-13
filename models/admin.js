const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/config.js');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    username:{
        type: String, 
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByName = function(name, callback) {
    const query = {username: name};
    User.findOne(query, callback);
}

module.exports.addUser = function(newuser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newuser.password, salt, function(err, hash) {
            // Store hash in your password DB.
            newuser.password = hash;
            newuser.save(callback);
        });
    });
}

module.exports.comparePassword = function(password, hash, callback){
    bcrypt.compare(password, hash, (err, isMatch)=>{
        if(err)return err;
        callback(null, isMatch);
    });
}