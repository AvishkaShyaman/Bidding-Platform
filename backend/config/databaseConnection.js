const mongoose = require('mongoose');

const db = () => {
  
  const MONGODB_URL = process.env.MONGODB_URI;

  mongoose.connect(
    MONGODB_URL,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        console.log('Database Error ', err.message);
      }
    }
  );

  mongoose.connection.once('open', () => {
    console.log('Database connected');
  });
};

module.exports = db;