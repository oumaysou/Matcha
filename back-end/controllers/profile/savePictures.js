import generalQuery from '../../models/generalQuery.js';
import { db } from '../../initDb.js';

const savePictures = async (req, res) => {
    const value = req.query;

    console.log(value);
    
    // const result = generalQuery.savePictures({table, field, value});
    // if (result.affectedRows > 0) {
    //     res.status(200).send({
    //         success: true,
    //         message: `${value} has been deleted successfully.`,
    //     });
    // }
    // else {
    //     res.send({
    //         success: false,
    //         message: `Sorry, but ${value} doesn't exist.`,
    //     });
    // }
};

module.exports = savePictures;