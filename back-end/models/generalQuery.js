import mysql from 'mysql';
import { db } from '../initDb.js';

const get = ({ table, field, value }) => {
    try {
        const user = new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ${table} WHERE ${field} = ?`;
            db.query(sql, value, (err, row) => {
                if (err)
                    return reject(err);
                return resolve(row);
            })
        })
        return user;

    } catch (err) {
        console.error('Cannot connect to the database db_matcha.\n');
    }
};

// const getBis = ({table, field, value, fieldBis, valueBis}) => {
//     try {
//         const user = new Promise((resolve, reject) => {
//             const sql = `SELECT * FROM ${table} WHERE ${field} = ? AND ${fieldBis} = ?`;
//             db.query(sql, [value, valueBis], (err, row) => {
//                 if (err)
//                     return reject(err);
//                 return resolve(row);
//             })
//         })
//         return user;

//     } catch(err) {
//         console.error('Cannot connect to the database db_matcha.\n');
//     }
// };

const getId = ({ table, field, value, fieldBis, valueBis }) => {
    try {
        const user = new Promise((resolve, reject) => {
            const sql = `SELECT id FROM ${table} WHERE ${field} = ? AND ${fieldBis} = ?`;
            db.query(sql, [value, valueBis], (err, row) => {
                if (err)
                    return reject(err);
                return resolve(row);
            })
        })
        return user;

    } catch (err) {
        console.error('Cannot connect to the database db_matcha.\n');
    }
};

const getAll = ({ table }) => {
    // console.log("getAll ok");
    try {
        const users = new Promise((resolve, reject) => {
            const sql = `SELECT * FROM ${table}`;
            db.query(sql, (err, rows) => {
                if (err)
                    return reject(err);
                return resolve(rows);
            })
        });
        return users;
    } catch (err) {
        console.error('Cannot connect to the database db_matcha.\n');
    }
}

const insert = ({ table, userData }) => {
    try {
        const result = new Promise((resolve, reject) => {
            const sql = `INSERT INTO ${table} SET ?`;
            db.query(sql, userData, (err, data) => {
                if (err)
                    return resolve(err);
                return resolve(data);
            })
        });
        return result;
    } catch (err) {
        console.error('Cannot connect to the database db_matcha.\n', err);
    }
};

const update = ({ table, field, value, where, whereValue }) => {
    try {
        const user = new Promise((resolve, reject) => {
            const sql = `UPDATE ${table} SET ${field} = ? WHERE ${where} = ?`;
            db.query(sql, [value, whereValue], (err, row) => {
                if (err)
                    return reject(err);
                return resolve(row);
            })
        });
        return user;
    } catch (err) {
        console.error('Cannot connect to the database db_matcha.\n');
    }
};

const deleter = ({ table, field, value }) => {
    try {
        const result = new Promise((resolve, reject) => {
            const sql = `DELETE FROM ${table} WHERE ${field} = ?`;
            db.query(sql, value, (err, row) => {
                if (err)
                    reject(err);
                console.log(JSON.stringify(row))
                resolve(row);
            })
        });
        return result;
    } catch (err) {
        console.error('Cannot connect to the database db_matcha.\n');
    }
};

const getFilters = ({ table, minAdmired, maxAdmired, myUsername }) => {
    try {
        const users = new Promise((resolve, reject) => {
            // console.log("minadmired" + minAdmired);
            // const sql = `SELECT * FROM ${table} ORDER BY popularity DESC`;
            // let minAdmired = 200; 
            // const sql = `SELECT * FROM ${table} WHERE popularity BETWEEN ${minAdmired} AND ${maxAdmired} ORDER BY popularity DESC`;
            // SELECT * FROM users WHERE NOT username = 'roxanita' AND popularity BETWEEN 100 AND 200 ORDER BY popularity DESC
            const sql = `SELECT * FROM ${table} WHERE NOT username = '${myUsername}' AND popularity BETWEEN ${minAdmired} AND ${maxAdmired} ORDER BY popularity DESC`;
            // console.log("minadmired sql: " + minAdmired);
            // console.log("maxadmired sql: " + maxAdmired);
            db.query(sql, (err, rows) => {
                if (err)
                    return reject(err);
                return resolve(rows);
            })
        });
        return users;
    } catch (err) {
        console.error('Cannot connect to the database db_matcha.\n');
    }
}

const getAge = ({ table, minAge, maxAge, myUsername }) => {
    try {
        const users = new Promise((resolve, reject) => {
            // console.log("minadmired" + minAdmired);
            // const sql = `SELECT * FROM ${table} ORDER BY popularity DESC`;
            // let minAdmired = 200; 
            // const sql = `SELECT * FROM ${table} WHERE popularity BETWEEN ${minAdmired} AND ${maxAdmired} ORDER BY popularity DESC`;
            // SELECT * FROM users WHERE NOT username = 'roxanita' AND popularity BETWEEN 100 AND 200 ORDER BY popularity DESC


            const sql = `SELECT * FROM ${table} WHERE NOT username = '${myUsername}' AND popularity BETWEEN ${minAge} AND ${maxAge} ORDER BY popularity DESC`;
            // const sql = SELECT * FROM users WHERE NOT username = 'roxanita' AND birthday BETWEEN '1990-12-02' AND '1990-12-03' ORDER BY birthday DESC;
            
            
            
            // console.log("minadmired sql: " + minAdmired);
            // console.log("maxadmired sql: " + maxAdmired);
            db.query(sql, (err, rows) => {
                if (err)
                    return reject(err);
                return resolve(rows);
            })
        });
        return users;
    } catch (err) {
        console.error('Cannot connect to the database db_matcha.\n');
    }
}


module.exports = { get, getId, getAll, insert, update, deleter, getFilters, getAge };
