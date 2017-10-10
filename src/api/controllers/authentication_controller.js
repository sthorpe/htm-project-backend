/*jshint esversion: 6 */ 
const jwt = require('jsonwebtoken');

module.exports.authentication = function(args, res, next) {
    /**
     * Upon receiving a username and password we should check database
     * and if valid will return a token.
     **/
    console.log('User %s just logged in at %s', args.query.username, getDateTime());
    
    if(args.query.token){
        const value = verifyToken(args.query.token);
        console.log('Meeeeeeow');
        console.log(value);
    }
    
    const username = args.query.username; // jshint ignore:line
    const password = args.query.password; // jshint ignore:line

    // Generate token
    const token = jwt.sign({ username }, 'htm-secret');
    const userToken = { token };

    res.send(userToken, {
        'Content-Type': 'application/json'
    }, 200);
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