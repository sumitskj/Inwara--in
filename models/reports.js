const mongoose = require('mongoose');
const config = require('../config/config.js');

const reportSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    body:{
        type: String, 
        require: true
    },
    author: {
        type: String,
        require: true
    }
});

const Report = module.exports = mongoose.model('Report', reportSchema);

module.exports.getUserById = function(id, callback) {
    Report.findById(id, callback);
}

module.exports.getUserByName = function(name, callback) {
    const query = {category: name};
    Report.findOne(query, callback);
}

module.exports.addReport = function(newreport, callback){
    newreport.save(callback);
}


