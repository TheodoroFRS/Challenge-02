"use strict";
const mongoose = require('mongoose');
const connectDB = (url) => {
    return mongoose.connect(url, {}).then((response) => {
        console.log('MongoDB Connection Succeeded.');
    }).catch((error) => {
        console.log('Error in DB connection: ' + error);
    });
};
module.exports = connectDB;
