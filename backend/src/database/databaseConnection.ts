import { MongoClient, Db } from 'mongodb';
import config from '../config/env.config';
import winstonLogger from '../controllers/logs/winstonLoggerController';

const logger = winstonLogger('databaseConnection');
let database: Db;
let client: MongoClient;

export const connectDatabase = async (): Promise<void> => {
    try {
        // Connect to the MongoDB database with connection pooling
        client = new MongoClient(config.mongodb.connectionString, {
            maxPoolSize: 10,
            minPoolSize: 2,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        await client.connect();
        database = client.db(config.mongodb.databaseName);

        // Test the connection
        await database.command({ ping: 1 });
        logger.info("Database connected successfully");
    } catch (error) {
        logger.error("Error connecting to database: " + error);
        throw error;
    }
}

export const closeDatabase = async (): Promise<void> => {
    try {
        if (client) {
            await client.close();
            logger.info("Database connection closed");
        }
    } catch (error) {
        logger.error("Error closing database connection: " + error);
        throw error;
    }
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