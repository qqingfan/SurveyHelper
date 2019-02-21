const mongoose = require('mongoose');
const { Schema } = mongoose; // destruction, equals const Schema = mongoose.Schema

// mongoose wants to know all the properties that all the records could have
const userSchema = new Schema({
    googleId: String,
    name: String
});

// create a new collection 'users', use the 'userSchema'
// if the collection already exist, it will do
mongoose.model('users', userSchema);