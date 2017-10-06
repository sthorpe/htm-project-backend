/*jshint esversion: 6 */ 

const hat = require('hat');

module.exports.authentication = function(args, res, next) {
    /**
     * Upon receiving a username and password we should check database
     * and if valid will return a token.
     **/

    const username = args.query['username']; // jshint ignore:line
    const password = args.query['password']; // jshint ignore:line

    // Generate token
    const randomToken = hat();
    const userToken = { token: randomToken };

    res.send(userToken, {
        'Content-Type': 'application/json'
    }, 200);
};

