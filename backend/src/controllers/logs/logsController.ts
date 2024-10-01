import { Router } from "express";

const fs = require('fs');

const router = Router();

function logToFile(req: any, res: any) {
    var fileName = req.body.module;
    fs.appendFile('logs/' + fileName + '.txt', JSON.stringify(req.body.message) + '\n', function (err: any) {
        if (err) {
            res.status(500).send({message:'Error adding logs'+err});
        }else{
            res.status(200).send({message: 'Logs added successfully'}); 
        }    
    });
}

router.post('', logToFile);

export default router;