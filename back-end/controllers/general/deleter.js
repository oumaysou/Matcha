import generalQuery from '../../models/generalQuery.js';
import { db } from '../../initDb.js';

const deleter = async (req, res) => {
    const table = req.params.table;
    const field = req.params.field;
    const value = req.query.value; 

    const result = generalQuery.deleter({table, field, value});
    if (result.affectedRows > 0) {
        res.status(200).send({
            success: true,
            message: `${value} has been deleted successfully.`,
        });
    }
    else {
        res.send({
            success: false,
            message: `Sorry, but ${value} doesn't exist.`,
        });
    }
};

module.exports = deleter;
