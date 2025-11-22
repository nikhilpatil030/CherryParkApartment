import { Request, Response } from 'express';
import { findAll } from '../../database/databaseConnection';
import config from '../../config/env.config';
import winstonLogger from '../logs/winstonLoggerController';

const logger = winstonLogger('floorPlanController');

// Get all Floor Plans
export const getAllFloorPlans = (req: Request, res: Response): void => {
    findAll(config.mongodb.collections.floorPlans).then((result) => {
        res.status(200).json({
            message: 'All Floor Plans retrieved successfully',
            data: result
        });
    }).catch((err) => {
        logger.error('Error retrieving Floor Plans: ' + err);
        res.status(500).json({
            message: 'Error retrieving Floor Plans',
            error: err
        });
    });
};
