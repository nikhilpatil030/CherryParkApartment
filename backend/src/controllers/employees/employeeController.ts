import { Request, Response } from 'express';
import { findAll , findOne, insertOne} from '../../database/databaseConnection';
import { bcryptPassword, comparePassword } from '../../controllers/security/bcryptController';

var databaseConfig = require('../../../config/databaseConfig.json');
const jwt = require('jsonwebtoken');

import winstonLogger from '../../controllers/logs/winstonLoggerController';
const logger = winstonLogger('employeeController');

export const verifyEmployee = (req: Request, res: Response): void => {
    // Query to find one user by username
    const query = { username: req.body.username };
    findOne(databaseConfig.employeeCollection, query).then((result) => {
        logger.info("findOne success in verifyEmployee");
        res.status(200).json({message: 'employee verified successfully', token: "token"});
    }).catch((err) => {
        res.status(500).json({message: 'Error verifying employee',error: err});
    });
}

export const getAllMaintenanceRequests = (req: Request, res: Response): void => {
    findAll(databaseConfig.maintenanceRequestCollection).then((result) => {
        res.status(200).json({message: 'All maintenance requests retrieved successfully',data: result});
    }).catch((err) => {
        res.status(500).json({message: 'Error retrieving maintenance requests',error: err});
    });
}