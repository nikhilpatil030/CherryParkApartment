import { Request, Response } from 'express';

import { findAll , findOne} from '../../database/databaseConnection';

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

export const verifyResident = (req: Request, res: Response): void => {
    const { username, password } = req.body;
    // Query to find one user by username
    const query = { username: username , password: password };
    findOne(databaseConfig.residentsCollection, query).then((result) => {
        res.status(200).json({
        message: 'resident verified successfully',
        data: result
        });
    }).catch((err) => {
        res.status(500).json({
        message: 'Error verifying resident',
        error: err
        });
    });
}