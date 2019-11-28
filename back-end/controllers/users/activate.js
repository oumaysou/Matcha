import generalQuery from '../../models/generalQuery.js';
import { createToken } from '../../utils/crypt.js';
import moment from 'moment';

const activateUser = async (req, res) => {
    const { email, confirmToken } = req.body;

    if (email && confirmToken) {
        let user = await generalQuery.get({table: 'users', field: 'email', value: email});

        if (user[0] && confirmToken === user[0].confirmToken) {   
            const token = await createToken(user[0]);
            const fields = [];
            fields['activated'] = 1;
            fields['confirmToken'] = '';
            fields['token'] = token;
            fields['connected'] = true;
            fields['lastConnection'] = moment().format('L LT');

            for (let key in fields) {
                await generalQuery.update({ table: 'users', field : key, value: fields[key], where: 'username' , whereValue: user[0].username });
            }

            return res.send({
                success: true,
                message: "Your account has been activated",
                userData : await generalQuery.get({table: 'users', field: 'token', value: token})
            });
        }
        else if (user[0].activated === 1) {
            res.send({
                success: false,
                message: "Your account is already activated",
                userData : ''
            });
        }
        else {
            res.send({
                success: false,
                message: "Your account doesn't exist",
                userData : ''
            });
        }
    }
    else {
        res.send({
            success: false,
            message: "Your email or token is not valid",
            userData : ''
        });
    }
};

module.exports = activateUser;
