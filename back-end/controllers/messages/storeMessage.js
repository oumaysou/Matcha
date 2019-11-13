import generalQuery from '../../models/generalQuery.js';
import { db } from '../../initDb.js';
import * as util from 'util' // has no default export
import { inspect } from 'util';
import { getUsernameFromToken } from '../../utils/crypt';

const storeMessage = async (req, res) => {
    const table = `messages`;
    const message = req.params.message;
    const messageBy = getUsernameFromToken(req);
    const messageTo = req.params.username;
    const userData = {
        message,
        messageBy,
        messageTo
    };

    const result = await generalQuery.insert({ table, userData});
    if (result.affectedRows > 0) {
        res.status(200).send({
            success: true,
            message: `Your change has been updated.`,
        });
    }
    else {
        res.send({
            success: false,
            message: `Sorry but, ${field} doesn't exist.`,
        });
    }
};

module.exports = storeMessage;