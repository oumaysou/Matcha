import bcrypt from 'bcryptjs';
import moment from 'moment';
import generalQuery from '../models/generalQuery.js';

const errorsMsg = async (req) => {
    let errors = [];
    const {
        username,
        password,
        passwordCfm,
        birthday,
        firstName,
        lastName,
        email,
        gender,
        orientation
    } = req.body;

    const user = await generalQuery.get({table: 'users', field: 'username', value: username});
    let errUsername = checkUsername(username, user[0]);
    if (errUsername != '')
        errors.push(errUsername);
    let errPassword = checkPassword(password, passwordCfm);
    if (errPassword != '')
        errors.push(errPassword);
    let errBirth = checkBirth(birthday);
    if (errBirth != '')
        errors.push(errBirth);
    let errName = checkName(firstName, lastName);
    if (errName != '')
        errors.push(errName);
    let errEmail = checkEmail(email, user[0]);
    if (errEmail != '')
        errors.push(errEmail);
    let errGender = checkGender(gender);
    if (errGender != '')
        errors.push(errGender);
    let errOrientation = checkOrientation(orientation);
    if (errOrientation != '')
        errors.push(errOrientation);
    return (errors);
};

const checkUsername = (username, user) => {
    let error = '';

    if (user && user.username)
        error = "Your username is already taken.\n";
    else {
        if (!username.match(/^[a-z0-9]{8,20}$/))
            error = "Your username must have 8 to 20 alphanumeric characters.\n";
    }
    return error;
};

const checkPassword = (password, passwordCfm) => {
    let error = '';

    if (!password.match(/^[a-z0-9]{8,255}$/i))
        error = "Your password must have 8 alphanumeric characters minimum.\n";
    else if (password != passwordCfm)
        error = "Passwords are not the same.\n";
    return error;
};

const checkBirth = (birthDate) => {
    let birthday = moment(birthDate, "YYYY-MM-DD");
    let age = moment().diff(birthday, 'years');
    let error = '';

    if (!moment(birthday).isValid() || age > 120)
        error = "Your birthday is not valid.\n";
    else if (age < 18)
        error = "Sorry, but you must be over 18 to register.\n";
    return error;
};

const checkName = (firstName, lastName) => {
    let error = '';

    if (!firstName.match(/^[-a-z' ]+$/i) || !lastName.match(/^[-a-z' ]+$/i))
        error = "Your name is not valid.\n";
    return error;
};

const checkEmail = (email, user) => {
    let error = '';

    if (user && user.email)
        error = "Your email is already taken.\n";
    else {
        if (!email.match(/^[-a-z0-9_.]+@[-a-z0-9_]+\.[a-z]{2,3}$/))
            error = "Your email is not valid.\n";
    }
    return error;
};

const checkGender = (gender) => {
    let error = '';

    if (gender != 'male' && gender != 'female' && gender != 'both')
      error = "Your gender is not valid.\n";
    return error;
};

const checkOrientation = (orientation) => {
    let error = '';

    if (orientation != 'straight' && orientation != 'gay' && orientation != 'bisexual')
      error = "Your orientation is not valid.\n";
    return error;
};

const comparePassword = ({password, hash}) => {
    const result = new Promise((resolve, reject) => {
      try {
            const trueFalse = bcrypt.compareSync(password, hash);
            return resolve(trueFalse);
      } catch (err) {
        console.error('Error: ', err)
        return reject(err);
      }
    });
    return result;
};

module.exports = { errorsMsg, comparePassword};
