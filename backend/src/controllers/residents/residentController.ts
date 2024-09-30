import { Request, Response } from 'express';

import { findAll } from '../../database/databaseConnection';

var databaseConfig = require('../../../config/databaseConfig.json');

// Get all residents
export const getAllResidents = (req: Request, res: Response): void => {
    findAll(databaseConfig.residentsCollection).then((result) => {
        res.status(200).json({
            message: 'All residents retrieved successfully',
            data: result
        });
    }).catch((err) => {
        res.status(500).json({
            message: 'Error retrieving residents',
            error: err
        });
    });
};

export const putResident = (req: Request, res: Response): void => {
    res.status(200).json({
      message: 'resident updated successfully',
      data: []
    });
}