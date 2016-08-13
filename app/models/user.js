module.exports = function(mongoose) {
    var schema = new mongoose.Schema({
        email:  String,
        password: String,
        access_token: String,
        created_at: Date,
        modified_at: Date
    });

    return {
        schema: schema,
        model: mongoose.model('User', schema)
    }
};
