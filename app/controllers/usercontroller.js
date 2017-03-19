var User = require('../models/user');
var Subject = require('../models/subject');
var Userlogin = require('../models/userlogin');
var uuidV1 = require('uuid/v1');

(function () {
    function userRegistration(req, res) {
        var object = req.body;
        console.log(object);

        var newUser = User({
            firstName: object.firstName,
            lastName: object.lastName,
            age: object.age,
            dob: object.dob,
            gender: object.gender,
            phone: object.phone,
            description: object.description
        });

        newUser.save(function (err, user) {
            if (err) {
                console.log("err");
                res.json("err aaagya" + err);
            } else {
                console.log('User saved successfully!!!!');
                res.json("User saved successfully");
            }
        });
    }

    function getAllUsers(req, res) {
        User.find({}, function (err, users) {
            if (err)
                throw err;

            console.log(users);
            res.json(users);
        });
    }

    function getuserByFirstName(req, res) {
        User.find({'firstName': req.params.name}, function (err, user) {
            res.json(user);
        });

    }

    function userRegistrationWithPopulation(req, res) {
        var object = req.body;
        console.log(object);
        var newUser = User({
            firstName: object.firstName,
            lastName: object.lastName,
            age: object.age,
            dob: object.dob,
            gender: object.gender,
            phone: object.phone,
            description: object.description
        });

        newUser.save(function (err, user) {
            if (err) {
                return handleError(err)
            }
            var subject = new Subject({
                name: 'Englih',
                _usermapping: newUser._id
            });
            subject.save(function (err, subject) {
                if (err) {
                    console.log(err);
                    res.json(err);
                }

                Subject
                    .findOne({name: 'Englih'})
                    .populate('_usermapping')
                    .exec(function (err, subject) {
                        if (err) return handleError(err);
                        console.log(subject);
                        res.json(subject);
                        // prints "The creator is Aaron"
                    });
            })
        });

    }

    function signUp(req, res) {
        var object = req.body;
        console.log(object);
        var token = uuidV1();
        var newUser = Userlogin({
            username: object.username,
            password: object.password,
            token: token,
            firstName: object.firstName,
            girlfriendName: object.girlfriendName,
            wifeName: object.wifeName
        });
        newUser.save(function (err, user) {
            if (err)
                console.log(err);
            res.json(user);

        })
    }

    module.exports = {
        userRegistration: userRegistration,
        getAllUsers: getAllUsers,
        getUserByFirstName: getuserByFirstName,
        userRegistrationWithPopulation: userRegistrationWithPopulation,
        userSignUp: signUp
    }

})();