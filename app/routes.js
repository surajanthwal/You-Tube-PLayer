// grab the user model we just created
var User = require('./models/user');
var userController = require('./controllers/usercontroller');
var Userlogin = require('./models/userlogin');
var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;

passport.use(new Strategy(
    function (token, cb) {
        Userlogin.findByToken(token, function (err, user) {
            if (err) {
                return cb(err);
            }
            if (!user) {
                return cb(null, false);
            }
            return cb(null, user);
        });
    }));

module.exports = function (app) {
    //adding new User
    app.post('/registerUser', function (req, res) {
        userController.userRegistration(req, res)
    });

    //get all users from db
    app.get('/allUsers', function (req, res) {
        userController.getAllUsers(req, res)
    });

    //using the params property of req object
    app.get('/getUserByFirstName/:name', function (req, res) {
        console.log(req.params.name);
        userController.getUserByFirstName(req, res);
    });

    //using the population property of mongoose
    app.post('/registerUserAndUseMongoosePopulation', function (req, res) {
        userController.userRegistrationWithPopulation(req, res);
    });

    //using postman for authentication
    app.post('/signUpUser', function (req, res) {
        userController.userSignUp(req, res);
    });

    //using postman to allow aonly authenticated user...Bearer strategy of oauth2 authentication process is used
    //when making this request pass this header: 'Authorization': 'Bearer d4r4a730-0118-11e7-b1d0-4beeecc9d835'
    //the part after bearer is the token which is generated when signing up
    app.get('/getAuthenticatedDetails', passport.authenticate('bearer', {session: false}),
        function (req, res) {
            res.json(req.user);
        });

//     //sending a unique user
//     app.get('/api/userdiff', function (req, res) {
//         User.find({username: 'Anthwal'}, function (err, users) {
//             if (err) throw err;
//
//             // object of all the users
//             console.log(users);
//             res.json(users);
//         });
//     });
//
//
//     // get a user with ID of 1
//     app.get('/api/userId', function (req, res) {
//         User.findById("5823708f49f48259790443ee", function (err, user) {
//             if (err) throw err;
//
//             // show the one user
//             console.log(user);
//             res.json(user);
//         });
//     });
//
//     // Update a user
//     app.get('/api/userIdUpdate', function (req, res) {
//         User.findById("5823708f49f48259790443ee", function (err, user) {
//             if (err) throw err;
//             user.location = 'uk';
//             // show the one user
//             user.save(function (err) {
//                 if (err) throw err;
//
//                 console.log('User successfully updated!');
//             });
//             console.log(user);
//             res.json(user);
//         });
//     });
//     // find the user starlord55
// // update him to starlord 88
//     app.get('/api/usernameUpdate', function (req, res) {
//         User.findOneAndUpdate({username: 'starlord55'}, {username: 'starlord88'}, function (err, user) {
//             if (err) throw err;
//
//             // we have the updated user returned to us
//             console.log(user);
//         });
//     });
// //get a user and remove
//     app.get('/api/delUser', function (req, res) {
//         User.findOneAndRemove({username: 'starlord55'}, function (err) {
//             if (err) throw err;
//
//             // we have deleted the user
//             console.log('User deleted!');
//             res.json('message', 'done!!!');
//         });
//     });
//
//     app.get('/api/user', function (req, res) {
//
// //creating a new user
//         var newUser = User({
//             name: 'Peter Quill',
//             username: 'starlord55',
//             password: 'password',
//             admin: true
//         });
//         newUser.dudify(function (err, name) {
//             if (err) throw err;
//
//             console.log('Your new name is ' + name);
//         });
//         newUser.save(function (err, user) {
//             if (err) throw err;
//
//             console.log('User saved successfully!');
//             res.json(user);
//         });
//     });
//
//     // get any admin that was created in the past month
//     app.get('/api/userPast', function (req, res) {
// // get the date 1 month ago
//         var monthAgo = new Date();
//         monthAgo.setMonth(monthAgo.getMonth() - 1);
//
//         User.find({admin: true}).where('created_at').gt(monthAgo).exec(function (err, users) {
//             if (err) throw err;
//
//             // show the admins in the past month
//             console.log(users);
//             res.json(users);
//         });
//     });

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });

};
