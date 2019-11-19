import express from 'express';
import { getter, getAll } from '../controllers/general/getter';
import updater from '../controllers/general/updater';
import deleter from '../controllers/general/deleter';
import createUser from '../controllers/users/createUser';
import signIn from '../controllers/users/signIn';
import activateUser from '../controllers/users/activate';
import savePictures from '../controllers/profile/savePictures';
import getProfile from '../controllers/profile/getProfile';
import getMembers from '../controllers/members/getMembers';
import { setLike, getLike, UnsetLike } from '../controllers/profile/like';
import getMatches from '../controllers/messages/getMatches';
import updateUser from '../controllers/users/updateUser';

const router = express.Router();

//Exemple de requete get et delete :
// http://localhost:5000/api/users/email?value=greg.philips@gmail.com

//Exemple de requete put :
// http://localhost:5000/api/users/email?value=greg.philips@yopmail.com&id=22

router.get('/users/getall', getMembers);
router.get('/matches/getall', getMatches);

router.post('/users', createUser);
router.post('/update', updateUser);
router.post('/users/signin', signIn);
router.post('/users/activate', activateUser);
router.get('/users/profile/:username', getProfile);

router.get('/like/set/:username', setLike);
router.get('/like/get/:username', getLike);
router.get('/like/Unset/:username', UnsetLike);

router.post('/pictures', savePictures);

router.get('/:table', getAll);
router.get('/:table/:field/:value', getter);
router.put('/:table/:field', updater);
router.delete('/:table/:field', deleter);

module.exports = router;
