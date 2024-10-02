// Import the required modules
var Express = require('express');
var cors = require('cors');
const fs = require('fs');
const https = require('https');

//import config files
var config = require('../config/indixConfig.json');

//import routes 
import { connectDatabase } from './database/databaseConnection';
import residentsRoutes from './routes/residentsRoutes';
import floorPlanRoutes from './routes/floorPlanRoutes';

//import route component
import logsController from './controllers/logs/logsController'

// Create an Express application
var app = Express();
// Enable CORS for the API
app.use(cors());
// Middleware to parse incoming JSON requests
app.use(Express.json());

//mount routes
app.use('/residents', residentsRoutes)
app.use('/floorPlan', floorPlanRoutes)

//logs controller route
app.use('/logs', logsController)

//read SSL certificate
const options = {
    key: fs.readFileSync('server.key', 'utf8'),
    cert: fs.readFileSync('server.cert', 'utf8')
};

//create HTTPS server
const httpsServer = https.createServer(options, app);

// Start the server
httpsServer.listen(config.expressPort, async () => {
    console.log('Server is running on port ' + config.expressPort);
    connectDatabase();
})

