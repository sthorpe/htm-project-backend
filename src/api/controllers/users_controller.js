/*jshint esversion: 6 */ 
const User = require('../models/users');
let ObjectId = require('mongodb').ObjectID;

module.exports.findUser = function(username, password) {

    //REmove this!!!
    console.log('Recieved username and password: %s %s', username, password);

    User.findOne({ username }, function(err, user) {
        if (err) throw err;

        console.log('We found a %s', username);

        // Compare passwords
        user.comparePassword(password, function(err, isMatch) {
            if (err) throw err;
            console.log('Password is a match? ', isMatch); // true or false
        });
    });
};

module.exports.createUser = function(args, res, next) {
    // create a user a new user
    // const { username, password } = args.query;
    let username = 'sthorpe';
    let password = 'testing';

    let userModel = new User({ // jshint ignore:line
        _id:  new ObjectId(),
        username,
        password
    });
    
    // save user to database
    userModel.save(function(err) {
        if (err) throw err;

        // fetch user and test password verification
        User.findOne({ username }, function(err, user) {
            if (err) throw err;

            // Compare passwords
            user.comparePassword(password, function(err, isMatch) {
                if (err) throw err;
                console.log('Password is a match? ', isMatch); 
            });
        });
    });    
};