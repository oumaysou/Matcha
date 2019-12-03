import TokenGenerator from 'uuid-token-generator';
import { errorsMsg } from '../../utils/checking.js';
import { hashPwd } from '../../utils/crypt.js';
import sendMail from '../../utils/sendMail.js';
import { getCity, getLocation } from '../../utils/geolocation.js';
import generalQuery from '../../models/generalQuery.js';

const createUser = async (req, res) => {
    let {
        password,
        passwordCfm,
        birthday,
        username,
        firstName,
        lastName,
        email,
        gender,
        orientation
    } = req.body;
    // console.log(req.body);
    if (!username || !password || !passwordCfm || !birthday
        || !firstName || !lastName || !email || !gender || !orientation) {
        return res.send({
            success: false,
            message: "All fields must be completed!"
        });
    }

    let errors = await errorsMsg(req);

    if (!errors[0]) {
        const user = await generalQuery.get({ table: 'users', field: 'username', value: username });

        if (!user[0]) {
            const confirmToken = new TokenGenerator(128, TokenGenerator.BASE62).generate();
            const location = await getLocation();
            const city = await getCity();
            console.log('location =' + location + ', city = ' + city);

            const userData = {
                username,
                password: hashPwd(password),
                birthday,
                firstName,
                lastName,
                email,
                gender,
                orientation,
                confirmToken,
                location,
            };
            console.log("data 1", userData);
            const data = await generalQuery.insert({ table: 'users', userData });
            console.log("data 2", data);
            if (data.affectedRows > 0) {
                const subject = "Confirm your account";
                const indication = "Please click this link to confirm your account :";
                const link = `<a href="http://localhost:3000/activate?email=${email}&token=${confirmToken}">https://www.matcha.com/activate</a>`;
                sendMail(email, subject, indication, link);
                res.status(200).send({
                    success: true,
                    message: "Your account has been successfully created.\n An email has been sent to confirm your account.",
                    data: userData
                });
            }
            else {
                return res.send({
                    success: false,
                    message: "Something went wrong,try tu use an other email",
                });
            }
        }
        else {
            return res.send({
                success: false,
                message: "Sorry but, there is an error with the query",
            });
        }
    }
    else {
        return res.send({
            success: false,
            message: errors
        });
    }
};

module.exports = createUser;
