const mongoose = require('mongoose');

const connectDB = async () =>{  //Connect to mongoDB database
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`mongodb connected: ${conn.connection.host}`);
  } catch(error){
    console.error('db connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
