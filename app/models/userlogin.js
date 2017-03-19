var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userloginSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    girlfriendName: {type: String, required: true},
    wifeName: {type: String, required: true},
    token: {type: String},
    created_at: Date,
    updated_at: Date
});

userloginSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});

var Userlogin = mongoose.model('Userlogin', userloginSchema);

Userlogin.findByToken = function (token, cb) {
    Userlogin.find({token: token}, function (err, user) {
        if (err)
            cb(err);
        if (!user)
            cb(null, null);
        cb(null, user);
    });
};
module.exports = Userlogin;
