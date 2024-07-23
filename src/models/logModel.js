const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let logSchema = new Schema({
    IPAddress: {
        type: String,
        required: true
    },
    URL: {
        type: String,
        required: false
    },
    DeviceType: {
        type: String,
        required: false
    },
    OS: {
        type: String,
        required: false
    },
    Os_Version: {
        type: String,
        required: false
    },
    Browser_name: {
        type: String,
        required: false
    },
    Browser_version: {
        type: String,
        required: false
    },
    DateTime: {
        type: Date,
        required: false
    },
    Action: {
        type: String,
        required: false
    },
    Method: {
        type: String,
        required: false
    },
    Status: {
        type: String,
        required: false
    },
    route: {
        type: String,
        required: false
    },

}, {
    timestamps: true, versionKey: false
});

// Export the model
module.exports = mongoose.model('Logger', logSchema, 'Logger')