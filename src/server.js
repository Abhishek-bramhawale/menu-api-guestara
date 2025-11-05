const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health',(req, res) =>{
  res.json({ status: 'ok', message: 'server is running' });
});

app.get('/', (req, res) =>{
  res.json({
    message: 'menu management apis',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,() =>{
  console.log(`server running on port ${PORT}`);
});

module.exports = app;
