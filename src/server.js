const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/database');

dotenv.config({ path: path.join(__dirname, '..', '.env') });
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/subcategories', require('./routes/subCategoryRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));

app.get('/', (req, res) =>{
  res.json({
    message: 'menu management apis',
  });
});

app.get('/health',(req, res) =>{
  res.json({ status: 'ok', message: 'server is running' });
});

app.use(require('./middleware/errorHandler'));

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT,() =>{
  console.log(`server running on port ${PORT}`);
});

module.exports = app;
