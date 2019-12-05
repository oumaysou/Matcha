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

const getBis = ({ table, field, value, fieldBis, valueBis }) => {
    try {
        const user = new Promise((resolve, reject) => {
            const sql = `SELECT id, message, messageBy FROM ${table} WHERE ${field} = ? AND ${fieldBis} = ?`;
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
    // console.log(userData);

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
            console.log("minadmi" + minAdmired);
            console.log("maxadmi" + maxAdmired);
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
            console.log("minage sql" + minAge);
            console.log("maxage sql" + maxAge);
            // const sql = `SELECT * FROM ${table} ORDER BY popularity DESC`;
            // let minAdmired = 200; 
            // const sql = `SELECT * FROM ${table} WHERE popularity BETWEEN ${minAdmired} AND ${maxAdmired} ORDER BY popularity DESC`;
            // SELECT * FROM users WHERE NOT username = 'roxanita' AND popularity BETWEEN 100 AND 200 ORDER BY popularity DESC


            const sql = `SELECT * FROM ${table} WHERE NOT username = '${myUsername}' AND YEAR(birthday) BETWEEN '${minAge}' AND '${maxAge}' ORDER BY birthday ASC`;

            // SELECT * FROM users WHERE YEAR(birthday) BETWEEN '1980' AND '1980' ORDER BY birthday DESC
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

const getDistance = ({ table, myLat, myLong, minMax }) => {
    try {
        const users = new Promise((resolve, reject) => {
            console.log("latitud sql", myLat);
            console.log("magnitud sql", myLong);
            console.log("minmax sql", minMax);
            const sql = `SELECT *, SUBSTRING_INDEX(location, ',', 1), SUBSTRING_INDEX(location, ',', -1), SQRT(
                POW(69.1 * (SUBSTRING_INDEX(location, ',', 1) - ${myLat}), 2) +
                POW(69.1 * (${myLong} - SUBSTRING_INDEX(location, ',', -1)) * COS(SUBSTRING_INDEX(location, ',', 1) / 57.3), 2)) AS distance
                FROM ${table} HAVING distance < ${minMax} ORDER BY distance`;
            db.query(sql, (err, rows) => {
                if (err)
                    return reject(err);
                return resolve(rows);
            })
        });
        // console.log("getdiss", JSON.stringify(users));
        return users;
    } catch (err) {
        console.error('Cannot connect to the database db_matcha.\n');
    }
}

const getMatch = ({ table, myLat, myLong, minMax, myMinAge, myMaxAge, myMinPopularity, myMaxPopularity, oSex, myUsername, Change }) => {

    console.log("table sql", table);
    console.log("latitud sql", myLat);
    console.log("longitud sql", myLong);
    console.log("minmax sql", minMax);
    // console.log("age sql", myAge);
    // console.log("popu sql", myPopularity);
    console.log("sex sql", oSex);
    console.log("MINAGE//MAXAGE//MINPOP//MAXPOP", myMinAge, myMaxAge, myMinPopularity, myMaxPopularity);
    console.log("sex sql", Change);

    try {
        const users = new Promise((resolve, reject) => {
            console.log("latitud sql", myLat);
            console.log("magnitud sql", myLong);
            console.log("minmax sql", minMax);
            const sql = `SELECT *, SUBSTRING_INDEX(location, ',', 1), SUBSTRING_INDEX(location, ',', -1), SQRT( POW(69.1 * (SUBSTRING_INDEX(location, ',', 1) - ${myLat}), 2) + POW(69.1 * (${myLong} - SUBSTRING_INDEX(location, ',', -1)) * COS(SUBSTRING_INDEX(location, ',', 1) / 57.3), 2)) AS distance FROM users WHERE NOT username = '${myUsername}' AND orientation = '${oSex}' AND popularity BETWEEN ${myMinPopularity} AND ${myMaxPopularity} AND YEAR(birthday) BETWEEN ${myMinAge} AND ${myMaxAge} AND gender = '${Change}' HAVING distance < ${minMax}`;
            db.query(sql, (err, rows) => {
                if (err)
                    return reject(err);
                return resolve(rows);
            })
        });
        // console.log("getdiss", JSON.stringify(users));
        return users;
    } catch (err) {
        console.error('Cannot connect to the database db_matcha.\n');
    }
}

const updateTag = ({ table, tags, tagName, myUsername }) => {
    try {
        const users = new Promise((resolve, reject) => {
            console.log("tagname sql", tagName);

            // SELECT * FROM users, tags WHERE NOT taggedBy = 'rororororo' AND tag = 'soccer' AND taggedBy = username 
            const sql = `SELECT * FROM ${table}, ${tags} WHERE NOT taggedBy = '${myUsername}' AND  tag = '${tagName}' AND taggedBy = username`;

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

module.exports = { get, getId, getBis, getAll, insert, update, deleter, getFilters, getAge, getDistance, getMatch, updateTag };
