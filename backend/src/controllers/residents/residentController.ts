import { Request, Response } from 'express';

import { findAll , findOne, insertOne} from '../../database/databaseConnection';
import { bcryptPassword, comparePassword } from '../../controllers/security/bcryptController';

var databaseConfig = require('../../../config/databaseConfig.json');

// Get all residents
export const getAllResidents = (req: Request, res: Response): void => {
    findAll(databaseConfig.residentsCollection).then((result) => {
        res.status(200).json({message: 'All residents retrieved successfully',data: result});
    }).catch((err) => {
        res.status(500).json({message: 'Error retrieving residents',error: err});
    });
};

export const registerResident = (req: Request, res: Response): void => {
    bcryptPassword(req.body.password).then((hashedPassword: any) => {
        console.log("hashed Password successfully");
        var filter = { username: req.body.username };
        var update = { $set: { email: req.body.email , password : hashedPassword , "personal identification": req.body.personalIdentification} };
        var options = { upsert: true };
        var data = {filter, update, options};
        insertOne(databaseConfig.residentsCollection, data).then((result) => {
            res.status(200).json({message: 'resident registered successfully',data: result}); 
        }).catch((err) => {
            res.status(500).json({message: 'Error registering resident',error: err});
        });
    }).catch((err: any) => {
        res.status(500).json({message: 'error in bcryptPassword',error: err});
    });
}

export const verifyResident = (req: Request, res: Response): void => {
    // Query to find one user by username
    const query = { username: req.body.username };
    findOne(databaseConfig.residentsCollection, query).then((result) => {
        comparePassword (req.body.password, result.password).then((isMatch: any) => {
            if (isMatch) {
                res.status(200).json({message: 'resident verified successfully',data: result});
            }else{
                res.status(401).json({message: 'Invalid password'});
            }
        })
    }).catch((err) => {
        res.status(500).json({message: 'Error verifying resident',error: err});
    });
}