var mongoose = require('mongoose');

module.exports = function() {
    var schema = new mongoose.Schema({
        email:  String,
        password: String,
        access_token: String,
        created_at: Date,
        modified_at: Date
    });

    return mongoose.model('User', schema);
};
