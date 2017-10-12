/*jshint esversion: 6 */ 

const mongoose = require('mongoose');
const vars = require('./vars');

module.exports.connect = function connect(connectedMessage = true) {
    // Don't create a new connection if we already have one
    if (mongoose.connection.readyState) {
        return mongoose.connection;
    }

    const db = mongoose.connect(vars.mongo).connection;
    // Set up database handlers
    if (connectedMessage) {
        db.on('connected', () => console.log(`Connected to mongodb at ${vars.mongo}`));
    }
    db.on('error', err => console.error(`Oh dear. Received ${err} while connecting to ${vars.mongo}`));
    db.on('disconnected', () => console.log(`Disconnected from mongodb at ${vars.mongo}`));
    // Disconnect from mongodb if Node process ends
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log(`Disconnected from mongodb at ${vars.mongo} due to process termination`);
            process.exit(0);
        });
    });
};