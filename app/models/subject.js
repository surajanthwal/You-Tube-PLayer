var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var subjectSchema = new Schema({
    name: {type: String, required: true},
    _usermapping: {type: String, ref: 'User'},
    created_at: Date,
    updated_at: Date
});

subjectSchema.pre('save', function (next) {
    var currentDate = new Date();
    this.updated_at = currentDate;
    if (!this.created_at)
        this.created_at = currentDate;
    next();
});

var Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;
