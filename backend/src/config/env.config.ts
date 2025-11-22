import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

export const config = {
    // Server Configuration
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '9443', 10),

    // Database Configuration
    mongodb: {
        connectionString: process.env.MONGODB_CONNECTION_STRING || '',
        databaseName: process.env.MONGODB_DATABASE_NAME || 'cherryPark',
        collections: {
            residents: process.env.MONGODB_RESIDENTS_COLLECTION || 'cherryParkResidents',
            floorPlans: process.env.MONGODB_FLOORPLAN_COLLECTION || 'cherryParkFloorPlans',
            employees: process.env.MONGODB_EMPLOYEE_COLLECTION || 'cherryParkEmployees',
            maintenance: process.env.MONGODB_MAINTENANCE_COLLECTION || 'maintenanceRequests',
        }
    },

    // Security
    jwt: {
        secret: process.env.JWT_SECRET || '',
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    },

    // CORS Configuration
    cors: {
        origins: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:4200'],
    },

    // SSL/TLS Configuration
    ssl: {
        certPath: process.env.SSL_CERT_PATH || './certs/server.cert',
        keyPath: process.env.SSL_KEY_PATH || './certs/server.key',
    },

    // Logging
    logging: {
        level: process.env.LOG_LEVEL || 'info',
        filePath: process.env.LOG_FILE_PATH || './logs/app.log',
    },

    // Rate Limiting
    rateLimit: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
        maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
    },

    // File Upload
    upload: {
        maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10), // 5MB
        uploadPath: process.env.UPLOAD_PATH || './uploads',
    },
};

// Validate required environment variables
const requiredEnvVars = [
    'MONGODB_CONNECTION_STRING',
    'JWT_SECRET',
];

const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0 && config.nodeEnv === 'production') {
    throw new Error(
        `Missing required environment variables: ${missingEnvVars.join(', ')}\n` +
        'Please create a .env file based on .env.example'
    );
}

// Warn in development if missing
if (missingEnvVars.length > 0 && config.nodeEnv === 'development') {
    console.warn(
        `⚠️  Warning: Missing environment variables: ${missingEnvVars.join(', ')}\n` +
        '   The application may not work correctly. Please create a .env file based on .env.example'
    );
}

export default config;
