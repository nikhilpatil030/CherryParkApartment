// Import the required modules
var Express = require('express');
var cors = require('cors');
const fs = require('fs');
const https = require('https');
const morgan = require('morgan');
const path = require('path');

//import config files
var config = require('../config/indixConfig.json');

//import routes 
import { connectDatabase } from './database/databaseConnection';
import residentsRoutes from './routes/residentsRoutes';
import floorPlanRoutes from './routes/floorPlanRoutes';
import employeesRoutes from './routes/employeesRoutes'

//import route component
import logsController from './controllers/logs/logsController'
import winstonLoggerController from './controllers/logs/winstonLoggerController'
const logger = winstonLoggerController('index');

// Create an Express application
var app = Express();
// Enable CORS for the API
app.use(cors());
// Middleware to parse incoming JSON requests
app.use(Express.json());

// API's logger
const logStream = fs.createWriteStream(path.join(__dirname, '../logs/API.log'), { flags: 'a' });
app.use(morgan('combined', { stream: logStream }));

//mount routes
app.use('/employees', employeesRoutes)
app.use('/residents', residentsRoutes)
app.use('/floorPlan', floorPlanRoutes)

//logs controller route
app.use('/logs', logsController)

// cache control
app.use((req: any, res: any, next: any) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '0');
    res.header('Pragma', 'no-cache');
    next();
});

//read SSL certificate
const options = {
    key: fs.readFileSync('server.key', 'utf8'),
    cert: fs.readFileSync('server.cert', 'utf8')
};

//create HTTPS server
const httpsServer = https.createServer(options, app);

// Start the server
app.listen(config.expressPort, async () => {
    try {
        logger.info('Server is running on port ' + config.expressPort);
        connectDatabase();
    } catch (error) {
        logger.error('Error starting server: ' + error);
    }
})

