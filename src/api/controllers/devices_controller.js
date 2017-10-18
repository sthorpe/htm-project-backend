/*jshint esversion: 6 */
const Device = require('../models/devices');
let ObjectId = require('mongodb').ObjectID;

module.exports.findDevices = function(args, res, next) {
    Device.find({}, function(err, docs) {
      if (!err){
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(docs));
      } else {throw err;}
    });
};

module.exports.createDevice = function(args, res, next) {
    // create a user a new user
    const { name, description } = args.body;

    let deviceModel = new Device({ // jshint ignore:line
        _id:  new ObjectId(),
        name: name,
        description: description,
        status: false
    });

    // save user to database
    deviceModel.save(function(err) {
        if (err) {
          throw err;
        }else{
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({'success': 'true'}));
        }

    });
};

module.exports.enableDevice = function(args, res, next) {
    const { deviceId, status } = args.body;

    Device.findOne({ _id: deviceId }, function(err, device) {
      if (err) {
        throw err;
      }else{
        device.status = status;
        device.save();
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({'updated': 'true'}));
      }
    });
};
