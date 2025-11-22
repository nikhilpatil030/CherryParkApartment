import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { findAll, findOne, insertOne } from '../../database/databaseConnection';
import { bcryptPassword, comparePassword } from '../../controllers/security/bcryptController';
import config from '../../config/env.config';

import winstonLogger from '../../controllers/logs/winstonLoggerController';
const logger = winstonLogger('employeeController');

export const verifyEmployee = (req: Request, res: Response): void => {
    // Query to find one user by username
    const query = { username: req.body.username };
    findOne(config.mongodb.collections.employees, query).then((result) => {
        logger.info("findOne success in verifyEmployee");

        // CRITICAL FIX: Implement proper password verification
        comparePassword(req.body.password, result.password).then((isMatch: any) => {
            if (isMatch) {
                // Create JWT token with employee data
                const tokenData = {
                    username: result.username,
                    email: result.email,
                    role: 'employee',
                    employeeId: result._id,
                };

                const token = jwt.sign(
                    tokenData,
                    config.jwt.secret,
                    { expiresIn: config.jwt.expiresIn }
                );

                logger.info(`Employee ${req.body.username} verified successfully`);
                res.status(200).json({
                    message: 'Employee verified successfully',
                    token: token
                });
            } else {
                logger.warn(`Invalid password attempt for employee: ${req.body.username}`);
                res.status(401).json({message: 'Invalid password'});
            }
        }).catch((err) => {
            logger.error('Error comparing password: ' + err);
            res.status(500).json({message: 'Error verifying password', error: err});
        });
    }).catch((err) => {
        logger.error('Error verifying employee: ' + err);
        res.status(500).json({message: 'Error verifying employee', error: err});
    });
}

export const registerEmployee = (req: Request, res: Response): void => {
    bcryptPassword(req.body.password).then((hashedPassword: any) => {
        logger.info("Hashed password successfully");
        const filter = { username: req.body.username };
        const update = {
            $set: {
                email: req.body.email,
                password: hashedPassword,
                role: 'employee',
                department: req.body.department || 'general',
                createdAt: new Date(),
            }
        };
        const options = { upsert: true };
        const data = { filter, update, options };
        insertOne(config.mongodb.collections.employees, data).then((result) => {
            res.status(200).json({message: 'Employee registered successfully', data: result});
        }).catch((err) => {
            logger.error('Error registering employee: ' + err);
            res.status(500).json({message: 'Error registering employee', error: err});
        });
    }).catch((err: any) => {
        logger.error('Error in bcryptPassword: ' + err);
        res.status(500).json({message: 'Error in bcryptPassword', error: err});
    });
}

export const getAllMaintenanceRequests = (req: Request, res: Response): void => {
    findAll(config.mongodb.collections.maintenance).then((result) => {
        res.status(200).json({message: 'All maintenance requests retrieved successfully', data: result});
    }).catch((err) => {
        logger.error('Error retrieving maintenance requests: ' + err);
        res.status(500).json({message: 'Error retrieving maintenance requests', error: err});
    });
}
