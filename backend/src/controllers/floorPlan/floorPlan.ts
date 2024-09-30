import { Request, Response } from 'express';

import { findAll } from '../../database/databaseConnection';

var databaseConfig = require('../../../config/databaseConfig.json');

// Get all Floor Plans
export const getAllFloorPlans = (req: Request, res: Response): void => {
    findAll(databaseConfig.floorPlanCollection).then((result) => {
        res.status(200).json({
            message: 'All Floor Plans retrieved successfully',
            data: result
        });
    }).catch((err) => {
        res.status(500).json({
            message: 'Error retrieving Floor Plans',
            error: err
        });
    });
};