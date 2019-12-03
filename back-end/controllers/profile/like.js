import profileQuery from '../../models/profileQuery';
import generalQuery from '../../models/generalQuery'
import { getUsernameFromToken } from '../../utils/crypt';
import userTools from '../../utils/userTools';

const setLike = async (req, res) => {
    const myUsername = getUsernameFromToken(req);
    const username = req.params.username;

    const result = await profileQuery.setNewLike(myUsername, username);
    if (result) {
        return res.send({
            success: true,
            message: `You liked ${username}`,
        })
    }
    return res.send({
        success: false,
        message: `You cannot like ${username}`
    })
}
//FONCTION A METTRE EN PLACE POUR LE BUG LIKE
const UnsetLike = async (req, res) => {
    const myUsername = getUsernameFromToken(req);
    const username = req.params.username;

    const result = await profileQuery.UnsetLike(myUsername, username);
    if (result) {
        return res.send({
            success: true,
            message: `You don't liked ${username} anymore`,
        })
    }
    return res.send({
        success: false,
        message: `You cannot unlike ${username}`
    })
}

const getLike = async (req, res) => {
    const myUsername = getUsernameFromToken(req);
    const username = req.params.username;

    const whoLikedMe = await profileQuery.whoLikedMe(myUsername);
    const whoILike = await profileQuery.whoILike(myUsername);
    const likedMe = whoLikedMe.includes(username) ? true : false;
    const likedByMe = whoILike.includes(username) ? true : false;
    const notif = await generalQuery.get({ table: 'users', field: 'username', value: myUsername })
    const notifLike = notif[0].notifLike;
    return res.send({ success: true, likedMe, likedByMe, showOnce: true, whoLikedMe, notifLike });
}

const getMatch = async (loginsArray, blockedFilter) => {
    // const profiles = await Getter.getProfilesIn(loginsArray, blockedFilter);
    // const profilesRecentFirst = [];
    // loginsArray.forEach((login) => {
    //   if (blockedFilter.includes(login) === false) {
    //     const index = profiles.findIndex(profile => profile.login === login);
    //     profilesRecentFirst.unshift(profiles[index]);
    //   }
    // });
    // return profilesRecentFirst;
};

module.exports = {
    setLike,
    getLike,
    UnsetLike,
    getMatch
}
