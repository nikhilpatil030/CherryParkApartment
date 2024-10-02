var MongoClient = require('mongodb').MongoClient;
var databaseConfig = require('../../config/databaseConfig.json');

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
        console.log("Database connected");
    });
}

export function findAll(collectionName:string):Promise<any> {
    return new Promise((resolve, reject) => {
        database.collection(collectionName).find({}).toArray(function (err:any, res:any) {
            if (err) reject(err);
            console.log(res);
            resolve(res);
        });
    })
}

export function findOne(collectionName:string, query:any):Promise<any> {
    return new Promise((resolve, reject) => {
        database.collection(collectionName).findOne(query).then((result: any) => {
            if (!result) reject("result not found");
            resolve(result);
        }).catch((err: any) => {
            console.log(" err: " + JSON.stringify(err) );
            reject(err);
        });
    })
}

export function insertOne(collectionName:string, data:any):Promise<any> {
    return new Promise((resolve, reject) => {
        database.collection(collectionName).updateOne(data.filter, data.update, data.options).then((result: any) => {
            if (!result) reject("not able to insert in db");
            resolve(result);
        }).catch((err: any) => {
            console.log(" err: " + JSON.stringify(err) );
            reject(" err: " + JSON.stringify(err) );
        });
    })
}