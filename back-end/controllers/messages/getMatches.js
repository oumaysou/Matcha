import { getUsernameFromToken } from '../../utils/crypt';
import profileQuery from '../../models/profileQuery';

const getMatches = async (req, res) => {
    const myUsername = getUsernameFromToken(req);

    if (!myUsername)
        return res.send({ success: false, message: "The profile doesn't exist" });
    const likedByMe = await profileQuery.whoILike(myUsername);
    const likedMe = await profileQuery.whoLikedMe(myUsername);
    let matches = [];

    likedByMe.map(user => {
        if (likedMe.includes(user))
            matches.push(user);
    })

    return res.send({
        success: true,
        matches
    });
}

module.exports = getMatches;
