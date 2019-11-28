import generalQuery from '../../models/generalQuery.js';
import { db } from '../../initDb.js';

const getter = async (req, res) => {
    const table = req.params.table;
    const field = req.params.field;
    const value = req.params.value;
    
    const user = await generalQuery.get({table, field, value});
    
    if (user[0]) {      
        res.send({
            success: true,
            message: `${value} has been found.`,
            data: user
        });
    }
    else {
        res.send({
            success: false,
            message: `Sorry but, ${value} doesn't exist.`,
        });
    }
};

const getAll = async (req, res) => {
    const table = req.params.table;

    const users = await generalQuery.getAll({table});
    
    if (users[0]) {
        res.status(200).send({
            success: true,
            message: `${table} has been found`,
            data: users
        });
    }
    else {
        res.send({
            success: false,
            message: `Sorry but, there is no ${table} yet`
        });
    }
};

module.exports = {
    getAll,
    getter
}
