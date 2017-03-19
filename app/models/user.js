
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: String, required: true},
    dob: {type: Date},
    gender: {type: String, required: true},
    phone: {type: String, required: true},
    description: {type: String, required: true},
    created_at: Date,
    updated_at: Date
});

userSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});

var User = mongoose.model('User', userSchema);
module.exports = User;


// name: String,
// username: {type: String, required: true, unique: true},
// password: {type: String, required: true},
// admin: Boolean,
// location: String,
// meta: {
//     age: Number,
//     website: String
// },
// created_at: Date,
// updated_at: Date


// custom method to add string to end of name

// userSchema.methods.dudify = function () {
//     // add some stuff to the users name
//     this.name = this.name + '-dude';
//
//     return this.name;
// };

//the schema is useless so far
// we need to create a model using it

// make this available to our users in our Node applications
