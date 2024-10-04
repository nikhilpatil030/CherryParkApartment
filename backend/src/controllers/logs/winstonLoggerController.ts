import winston from 'winston';
import path from 'path';

const winstonLogger = (moduleName: string) => {

    // Custom format for log messages
    const myFormat = winston.format.combine(
        winston.format.label({ label: moduleName }),  // Add module name to the logs
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, label }) => {
        return `${timestamp} [${label}] ${level}: ${message}`;
        })
    )

    const logFilePath = path.join(__dirname, '../../../logs/backendLogs/' + moduleName + '.log');

    return winston.createLogger({
        format: myFormat,
        transports : [  //new winston.transports.Console(), 
                        new winston.transports.File({filename : logFilePath, level : 'info'}),
                        new winston.transports.File({filename : logFilePath, level : 'error'})]
    });
}

export default winstonLogger;
