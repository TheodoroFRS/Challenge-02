const mongoose = require('mongoose');

const connectDB = (url: any) => {
  return mongoose.connect(url, {
}).then((response: string) => {
    console.log('MongoDB Connection Succeeded.')
}).catch((error: string) => {
    console.log('Error in DB connection: ' + error)
  });
};

module.exports = connectDB
