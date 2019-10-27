import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

function hashPwd(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const createToken = (user) => {
    const token = new Promise((resolve, reject) => {
        try {
            const result = jwt.sign(
                { username: user.username, id: user.id },
                'mybadasssecretkey',
                { expiresIn: '7d' },
            );
            return resolve(result);
        } catch (err) {
          console.error('Error: ', err)
          return reject(err);
        }
    });
    return token;
};

const getUsernameFromToken = (req) => {
  const token = req.cookies.token !== 'null' ? req.cookies.token : '';
  if (!token)
    return ;
  const decoded = jwt.verify(token, 'mybadasssecretkey');
  return decoded.username;
};

module.exports = { hashPwd, createToken, getUsernameFromToken };
