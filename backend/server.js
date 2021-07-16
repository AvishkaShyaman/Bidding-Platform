const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connectDB = require('./config/databaseConnection');
const dotenv = require('dotenv');

// env config
dotenv.config({ path: './backend/config/.env' });

// DB Connection
connectDB();

//import routes
const vehicle = require('./routes/vehicle.route');

const app = express();

// CORS
app.use(cors());

// Body Parser
app.use(bodyParser.json());

//register routes
app.use('/api/v1/vehicle',vehicle);

// Static Files
app.use(express.static('public'));

// morgan http
process.env.NODE_ENV === 'development' ? app.use(morgan('dev')) : '';

const PORT = process.env.PORT || 5000;

app.listen(PORT , () =>  {
    console.log(`Server is up and running on ${PORT}`);
});