const bcrypt = require('bcrypt');
const saltRounds = 10;


export const bcryptPassword = (password: any) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err: any, hash: any) {
            if (err) reject(err);
            resolve(hash);
        });
    });
}

export const comparePassword = (loginPassword: any, hashedPasswordFromDB: any) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(loginPassword, hashedPasswordFromDB, function (err: any, result: any) {
            if (err) reject(err);
            resolve(result);
        });
    });
}