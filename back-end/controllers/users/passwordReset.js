import sendMail from '../../utils/sendMail.js';
import generalQuery from '../../models/generalQuery.js';
import { hashPwd } from '../../utils/crypt.js';
import { createToken } from '../../utils/crypt.js';

const passwordReset = async (req, res) => {
    const email = req.params.email;

    var generator = require('generate-password');
    var password = generator.generate({
        length: 10,
        numbers: true
    });

    var hashedPassword = hashPwd(password);
    const dataPw = await generalQuery.update({ 
        table: 'users', 
        field: 'password', 
        value: hashedPassword, 
        where:'email', 
        whereValue: email
    });

    let user = await generalQuery.get({table: 'users', field: 'email', value: email});
    if (user[0]) {
        const token = await createToken(user[0]);
        
        const dataToken = await generalQuery.update({ 
            table: 'users', 
            field: 'token', 
            value: token, 
            where:'email', 
            whereValue: email
        });

        if (dataPw.affectedRows > 0 && dataToken.affectedRows > 0) {
            const subject = "Forgot password";
            const indication = `Your new password is: "${password}". You can sign in here:`;
            const link = `<a href="http://localhost:3000/">https://www.matcha.com/Signin</a>`;
            sendMail(email, subject, indication, link);
            res.send({
                success: true
            })
        }
        else
            console.error("Something went wrong with the function generalQuery.update().");
    }
    else {
        console.error("Something went wrong with the function generalQuery.get()");
    }
    
}

module.exports = passwordReset;
