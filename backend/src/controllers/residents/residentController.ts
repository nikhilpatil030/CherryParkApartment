import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { findAll, findOne, insertOne } from '../../database/databaseConnection';
import { bcryptPassword, comparePassword } from '../../controllers/security/bcryptController';
import { filterResidentData } from './residentDataController';
import config from '../../config/env.config';

import winstonLogger from '../../controllers/logs/winstonLoggerController';
const logger = winstonLogger('residentController');

// Get all residents
export const getAllResidents = (req: Request, res: Response): void => {
    findAll(config.mongodb.collections.residents).then((result) => {
        res.status(200).json({message: 'All residents retrieved successfully', data: result});
    }).catch((err) => {
        logger.error('Error retrieving residents: ' + err);
        res.status(500).json({message: 'Error retrieving residents', error: err});
    });
};

export const registerResident = (req: Request, res: Response): void => {
    bcryptPassword(req.body.password).then((hashedPassword: any) => {
        logger.info("Hashed password successfully");
        const filter = { username: req.body.username };
        const update = {
            $set: {
                email: req.body.email,
                password: hashedPassword,
                "personal identification": req.body.personalIdentification,
                role: 'resident',
                createdAt: new Date(),
            }
        };
        const options = { upsert: true };
        const data = { filter, update, options };
        insertOne(config.mongodb.collections.residents, data).then((result) => {
            res.status(200).json({message: 'Resident registered successfully', data: result});
        }).catch((err) => {
            logger.error('Error registering resident: ' + err);
            res.status(500).json({message: 'Error registering resident', error: err});
        });
    }).catch((err: any) => {
        logger.error('Error in bcryptPassword: ' + err);
        res.status(500).json({message: 'Error in bcryptPassword', error: err});
    });
}

export const verifyResident = (req: Request, res: Response): void => {
    // Query to find one user by username
    const query = { username: req.body.username };
    findOne(config.mongodb.collections.residents, query).then((result) => {
        logger.info("findOne success in verifyResident");
        comparePassword(req.body.password, result.password).then((isMatch: any) => {
            if (isMatch) {
                const data = filterResidentData(result);
                const token = jwt.sign(
                    { ...data, role: 'resident' },
                    config.jwt.secret,
                    { expiresIn: config.jwt.expiresIn }
                );
                logger.info(`Resident ${req.body.username} verified successfully`);
                res.status(200).json({message: 'Resident verified successfully', token: token});
            } else {
                logger.warn(`Invalid password attempt for resident: ${req.body.username}`);
                res.status(401).json({message: 'Invalid password'});
            }
        }).catch((err) => {
            logger.error('Error comparing password: ' + err);
            res.status(500).json({message: 'Error verifying password', error: err});
        });
    }).catch((err) => {
        logger.error('Error verifying resident: ' + err);
        res.status(500).json({message: 'Error verifying resident', error: err});
    });
}
