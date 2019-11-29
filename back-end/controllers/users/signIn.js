import moment from 'moment';
import generalQuery from '../../models/generalQuery.js';
import { comparePassword } from '../../utils/checking.js';
import { createToken } from '../../utils/crypt.js';
import sendMail from '../../utils/sendMail.js';

const signIn = async (req, res) => {
    const { username, password } = req.body;
    let user = await generalQuery.get({ table: 'users', field: 'username', value: username });
    if (!user[0]) {
        return res.send({
            success: false,
            message: "Your accoun't hasn't been created.",
        });
    }
    else {
        const checkPassword = await comparePassword({ password, hash: user[0].password });
        if (!checkPassword) {
            return res.send({
                success: false,
                message: "Your password is wrong (8 alphanumeric characters minimum).",
            });
        }
        else if (user[0].confirmToken && !user[0].activated) {
            const subject = "Confirm your account";
            const indication = "Please click this link to confirm your account :";
            const link = `<a href="http://localhost:3000/activate?email=${user[0].email}&token=${user[0].confirmToken}">https://www.matcha.com/activated</a>`;

            sendMail(user[0].email, subject, indication, link);
            return res.send({
                success: false,
                message: "Your account hasn't been confirmed. We have sent you an email to activate it.",
            });
        }
        else {
            if (user[0].connected) {
                return res.send({
                    success: false,
                    message: `You are already connected!`,
                });
            }
            const updatedLastConnection = await generalQuery.update({
                table: 'users',
                field: 'lastConnection',
                value: moment().format('L LT'),
                where: 'token',
                whereValue: user[0].token
            });
            const updatedConnected = await generalQuery.update({
                table: 'users',
                field: 'connected',
                value: 1,
                where: 'token',
                whereValue: user[0].token
            });

            if (updatedLastConnection.affectedRows > 0 && updatedConnected.affectedRows > 0) {
                user = await generalQuery.get({ table: 'users', field: 'username', value: username });
                return res.send({
                    success: true,
                    message: `Welcome ${user[0].firstName} !`,
                    userData: user[0]
                });
            }
            else {
                return res.send({
                    success: false,
                    message: "The last connection hasn't been updated",
                    userData: user[0]
                });
            }

        }
    }
};

module.exports = signIn;
