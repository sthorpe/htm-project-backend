/*jshint esversion: 6 */ 
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { findUser } = require('./users_controller');

module.exports.authentication = function(args, res, next) {
    /**
     * Upon receiving a username and password we should check database
     * and if valid will return a token.
     **/

    const { username, password } = args.query;

    User.getAuthenticated(username, password, function(err, user, reason) {
        if (err) throw err;

        // login was successful if we have a user
        if (user) {
            // handle login success
            console.log('User %s just logged in at %s', args.query.username, getDateTime());
            const userToken = jwt.sign({ username }, 'htm-secret');
            args.session.token = userToken;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(args.session));
            console.log('login success');
            return;
        } else {
            res.end('Bad login', {
                'Content-Type': 'application/json'
            }, 200);
            console.log('Failed login attempt by user %s', args.query.username, getDateTime());
        }

        // otherwise we can determine why we failed
        let reasons = User.failedLogin;
        switch (reason) {
            case reasons.NOT_FOUND:
            case reasons.PASSWORD_INCORRECT:
                // note: these cases are usually treated the same - don't tell
                // the user *why* the login failed, only that it did
                break;
            case reasons.MAX_ATTEMPTS:
                // send email or otherwise notify user that account is
                // temporarily locked
                break;
        }
    });
};

module.exports.findUser = function(args, res, next) {
    User.findOne({ username }, function(err, user) {
        if (err) throw err;

        // Compare passwords
        user.comparePassword(password, function(err, isMatch) {
            if (err) throw err;
            console.log('Password is a match? ', isMatch); 
        });
    });
};

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, 'htm-secret');
    } 
    catch(err) {
        console.log(err);
    }
}

function getDateTime() {
    
    let date = new Date();

    let hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    let min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    let sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    let year = date.getFullYear();

    let month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    let day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec; 
}