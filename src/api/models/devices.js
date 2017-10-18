/*jshint esversion: 6 */
const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

const Schema = mongoose.Schema;
const ref = function ref(type) {
    return {
        type: Schema.Types.ObjectId,
        ref: type,
    };
};

const DeviceSchema = new Schema({
    _id: String, // Mongoose auto id
    name: { type: String, required: true, index: { unique: true } },
    description: { type: String, required: true },
    status: { type: Boolean, required: true, default: 0 },
});

module.exports = mongoose.model('Device', DeviceSchema);
