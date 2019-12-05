import TokenGenerator from 'uuid-token-generator';
import { errorsMsg } from '../../utils/checking.js';
import { hashPwd } from '../../utils/crypt.js';
import sendMail from '../../utils/sendMail.js';
import { getCity, getLocation } from '../../utils/geolocation.js';
import generalQuery from '../../models/generalQuery.js';
import { createToken } from '../../utils/crypt.js';
import moment from 'moment';

const updateUser = async (req, res) => {
    let {
        oldusername,
        birthday,
        username,
        firstName,
        lastName,
        location,
        gender,
        orientation,
        password,
        passwordCfm,
        tags,
        bio,

    } = req.body;
    
    if (!username || !password || !passwordCfm || !birthday || !location
        || !firstName || !lastName || !gender || !orientation || !bio || !tags)
    {
        return res.send({
          success: false,
          message: "All fields must be completed."
        });
    }

    let x = 2;

    if (x == 2)
    {
        const user = await generalQuery.get({table: 'users', field: 'username', value: oldusername});
        if (user[0]) {
            const token = await createToken(user[0]);
            const location = await getLocation();
            const city = await getCity();
            
            const userData = {
                oldusername,
                username,
                pswd: hashPwd(password),
                birthday,
                firstName,
                lastName,
                gender,
                orientation,
                password,
                passwordCfm,
                location,
                city,
                bio,
                tags
            };
            

            const fields = [];
            fields['username'] = userData.username;
            fields['password'] = userData.pswd;
            fields['firstName'] = userData.firstName;
            fields['lastName'] = userData.lastName;
            fields['gender'] = userData.gender;
            fields['birthday'] = userData.birthday;
            fields['location'] = req.body.location;
            fields['token'] = token;
            fields['orientation'] = userData.orientation;
            fields['bio'] = userData.bio;
            fields['lastConnection'] = moment().format('L LT');
            
            // console.log(fields['location']);
            
            for (let key in fields) {
                await generalQuery.update({ table: 'users', field : key, value: fields[key], where: 'username' , whereValue: userData.oldusername });
            }

            await generalQuery.deleter({table: 'tags', field: 'taggedBy', value: oldusername})
            
            
            
            tags.forEach(async e => {

                let dataObj ={
                    tag: e,
                    taggedBy: userData.username
                };
                try { 
                    await generalQuery.insert({ table: 'tags', userData: dataObj })
                }
                catch(error) {
                    console.error("ERROR : ",error);
                }
            });

            console.log("Les infos ont été enregistrés avec succès");
            res.status(200).send({
                    success: true,
                    message: "Your account has been successfully modified.",
                    data: userData
            });
            // const data = await generalQuery.update({table: 'users', userData});
            // if (data.affectedRows > 0) {
            //     const subject = "Confirm your account";
            //     const indication = "Please click this link to confirm your account :";
            //     const link = `<a href="http://localhost:3000/activate?email=${email}&token=${confirmToken}">https://www.matcha.com/activate</a>`;
            //     sendMail(email, subject, indication, link);
            //     res.status(200).send({
            //         success: true,
            //         message: "Your account has been successfully created.\n An email has been sent to confirm your account.",
            //         data: userData
            //     });
            // }
            // else
            //     console.error("Something went wrong with the function generalQuery.insert().");
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

module.exports = updateUser;
