// Import the required modules
var Express = require('express');
var cors = require('cors');

//import config files
var config = require('../config/indixConfig.json');

//import routes 
import residentsRoutes from './routes/residentsRoutes';
import { connectDatabase } from './database/databaseConnection';

// Create an Express application
var app = Express();
// Enable CORS for the API
app.use(cors());
// Middleware to parse incoming JSON requests
app.use(Express.json());

//mount resident routes
app.use('/residents', residentsRoutes)

// Start the server
app.listen(config.expressPort, async () => {
    console.log('Server is running on port 5038');
    connectDatabase();
})

