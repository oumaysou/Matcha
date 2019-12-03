import generalQuery from '../../models/generalQuery.js';
import { db } from '../../initDb.js';
import * as util from 'util' // has no default export
import { inspect } from 'util';
import { getUsernameFromToken } from '../../utils/crypt';
import moment from 'moment';


const storeMessage = async (req, res) => {
    const table = `messages`;
    const message = req.body.message;
    const messageBy = getUsernameFromToken(req);
    const messageTo = req.body.username;
    const time = moment().format('YYYY:MM:DD HH:mm:ss');
    const userData = {
        message,
        messageBy,
        messageTo,
        time
    };
    // console.log(JSON.stringify((req.body)))
    const result = await generalQuery.insert({ table, userData });
    if (result.affectedRows > 0) {
        res.status(200).send({
            success: true,
            message: `Your message has been stored.`,
        });
    }
    else {
        res.send({
            success: false,
            message: `Sorry but we can't store this message.`,
        });
    }
};

module.exports = storeMessage;