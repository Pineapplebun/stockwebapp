//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    providerUserId: {type: String, required: true},
    authProvider: {type: String, required: true},
    portfolios: [{type: Schema.ObjectId, ref: 'Portfolio', required: true}],
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('User', userSchema);