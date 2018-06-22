//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

//transationID is _id
var transactionSchema = new Schema({
  transaction_type: {type: String, required: true},
  transaction_date:{type: Date},
  price: {type: Number}
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Transaction', transactionSchema );