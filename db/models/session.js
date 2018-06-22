//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

//sessionID is _id
var sessionSchema = new Schema({
  providerUserId: {type: Schema.ObjectId, required: true},
  expiresIn: {type: Number},
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Session', sessionSchema );