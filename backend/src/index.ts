// Import the required modules
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import fs from 'fs';
import https from 'https';
import morgan from 'morgan';
import path from 'path';

// Import config files
import config from './config/env.config';

// Import routes
import { connectDatabase } from './database/databaseConnection';
import residentsRoutes from './routes/residentsRoutes';
import floorPlanRoutes from './routes/floorPlanRoutes';
import employeesRoutes from './routes/employeesRoutes';

// Import route component
import logsController from './controllers/logs/logsController';
import winstonLoggerController from './controllers/logs/winstonLoggerController';
const logger = winstonLoggerController('index');

// Create an Express application
const app = express();

// Security middleware - helmet for security headers
app.use(helmet());

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.maxRequests,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Enable CORS for the API with specific origins
app.use(cors({
    origin: config.cors.origins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware to parse incoming JSON requests
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API's logger
const logStream = fs.createWriteStream(path.join(__dirname, '../logs/API.log'), { flags: 'a' });
app.use(morgan('combined', { stream: logStream }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: config.nodeEnv,
    });
});

// Cache control
app.use((req: any, res: any, next: any) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '0');
    res.header('Pragma', 'no-cache');
    next();
});

// Mount routes
app.use('/api/employees', employeesRoutes);
app.use('/api/residents', residentsRoutes);
app.use('/api/floorPlan', floorPlanRoutes);
app.use('/api/logs', logsController);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.url} not found`,
        timestamp: new Date().toISOString(),
    });
});

// Global error handler
app.use((err: any, req: any, res: any, next: any) => {
    logger.error(`Error: ${err.message}`, { stack: err.stack, url: req.url, method: req.method });

    const statusCode = err.statusCode || 500;
    const message = config.nodeEnv === 'production' ? 'Internal Server Error' : err.message;

    res.status(statusCode).json({
        error: message,
        ...(config.nodeEnv !== 'production' && { stack: err.stack }),
        timestamp: new Date().toISOString(),
    });
});

// Start the server
const startServer = async () => {
    try {
        // Connect to database
        await connectDatabase();
        logger.info('Database connection established');

        // Check if SSL certificates exist
        const sslCertExists = fs.existsSync(config.ssl.certPath) && fs.existsSync(config.ssl.keyPath);

        if (sslCertExists && config.nodeEnv === 'production') {
            // Read SSL certificate
            const options = {
                key: fs.readFileSync(config.ssl.keyPath, 'utf8'),
                cert: fs.readFileSync(config.ssl.certPath, 'utf8'),
            };

            // Create HTTPS server
            const httpsServer = https.createServer(options, app);
            httpsServer.listen(config.port, () => {
                logger.info(`HTTPS Server is running on port ${config.port}`);
                logger.info(`Environment: ${config.nodeEnv}`);
            });
        } else {
            // For development or when SSL certs don't exist, use HTTP
            if (config.nodeEnv === 'production') {
                logger.warn('SSL certificates not found. Running in HTTP mode. This is NOT recommended for production!');
            }

            app.listen(config.port, () => {
                logger.info(`HTTP Server is running on port ${config.port}`);
                logger.info(`Environment: ${config.nodeEnv}`);
                logger.info(`Health check available at: http://localhost:${config.port}/health`);
            });
        }
    } catch (error) {
        logger.error('Error starting server: ' + error);
        process.exit(1);
    }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
    logger.info('SIGTERM signal received: closing HTTP server');
    process.exit(0);
});

process.on('SIGINT', async () => {
    logger.info('SIGINT signal received: closing HTTP server');
    process.exit(0);
});

// Start the application
startServer();

