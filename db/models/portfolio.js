//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

//portfolioID is _id
var portfolioSchema = new Schema({
  assets: [{type: Schema.Object, required: true}],
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Portfolio', portfolioSchema );