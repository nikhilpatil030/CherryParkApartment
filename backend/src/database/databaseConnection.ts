var MongoClient = require('mongodb').MongoClient;
var databaseConfig = require('../../config/databaseConfig.json');
import winstonLogger from '../controllers/logs/winstonLoggerController';
const logger = winstonLogger('databaseConnection');
var database:any;

export const connectDatabase =  () => {
    // Connect to the MongoDB database
    MongoClient.connect(databaseConfig.CONNECTIONSTRING, (error:any, client:any) => {
        if (error) {
            // If there is an error, log it and return
            console.error("Error connecting", error);
            return;
        }
        // Store the database in the database variable
        database = client.db(databaseConfig.DATABASENAME);
        logger.info("Database connected");
    });
}

export function findAll(collectionName:string):Promise<any> {
    return new Promise((resolve, reject) => {
        database.collection(collectionName).find({}).toArray(function (err:any, res:any) {
            if (err){ 
                logger.error("findAll: " + err);
                reject(err)
            };
            logger.info("findAll: " + res);
            resolve(res);
        });
    })
}

export function findOne(collectionName:string, query:any):Promise<any> {
    return new Promise((resolve, reject) => {
        database.collection(collectionName).findOne(query).then((result: any) => {
            if (!result) {
                logger.error("findOne : result not found");
                reject("findOne : result not found");
            }
            logger.info("findOne success");
            resolve(result);
        }).catch((err: any) => {
            logger.error("findOne err: " + JSON.stringify(err));
            reject("findOne err: " + JSON.stringify(err));
        });
    })
}

export function insertOne(collectionName:string, data:any):Promise<any> {
    return new Promise((resolve, reject) => {
        database.collection(collectionName).updateOne(data.filter, data.update, data.options).then((result: any) => {
            if (!result){
                logger.error("insertOne : not able to insert in db");
                reject("not able to insert in db");
            }
            logger.info("insertOne success"); 
            resolve(result);
        }).catch((err: any) => {
            logger.error("insertOne err: " + JSON.stringify(err) );
            reject("insertOne err: " + JSON.stringify(err) );
        });
    })
}