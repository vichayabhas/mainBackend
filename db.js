const mongoose = require('mongoose');

const connectDB = async ()=> {
  mongoose.set('stricQuery',true);
  const conn = await mongoose.connect(process.env.MONGO_URI);






  console.log(`MongoDB Connected: ${connection.host}`);
}



module.exports = connectDB;
