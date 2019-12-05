import profileQuery from '../../models/profileQuery';
import { getUsernameFromToken } from '../../utils/crypt';
import userTools from '../../utils/userTools';

const getProfile = async (req, res) => {

    const username = req.params.username;
    const myUsername = getUsernameFromToken(req);
    if (!myUsername)
        return res.send({ success: false, message: "The profile doesn't exist" });

    let user = await userTools.getUserData('username', username);
    // console.log("USER\n\n\n\n" + JSON.stringify(user) + "\n\n\n")
    if (!user)
        return res.send({ success: false, message: `${username} doesn't exist` });

    user = userTools.removeConfidentials(user, user.username);
    const photos = await profileQuery.getPhotos(user.username);
    const tags = await profileQuery.getTags(user.username);

    const visitedBy = await profileQuery.whoVisitedMe(user.username);


    const likedBy = await profileQuery.whoLikedMe(myUsername);
    const likedByMe = await profileQuery.whoILike(myUsername);
    // console.log("\n\n\n=>" + likedBy + "<=\n\n\n")
    if (myUsername !== username) {

        const blockedByMe = await profileQuery.getBlockedByMe(myUsername);
        const userBlockedMe = await profileQuery.whoBlockedMe(myUsername);

        if (blockedByMe.includes(username))
            return res.send({ success: false, message: `remember that ${username} has been blocked` });
        else if (userBlockedMe.includes(username))
            return res.send({ success: false, message: `${username} blocked you` });

        const result = await profileQuery.setNewVisit(myUsername, username);
        if (result) {
            return res.send({
                success: true,
                message: `${username}'s profile has been found`,
                photos,
                tags,
                visitedBy,
                likedBy,
                likedByMe,
                userData: user
            });
        }
        else {

            return res.send({
                success: false,
                message: `Cannot set a new visit`
            });
        }
    }
    else {
        return res.send({
            success: true,
            message: "Your profile has been found",
            photos,
            tags,
            visitedBy,
            likedBy,
            userData: user,
            likedByMe,
        });
    }
};

module.exports = getProfile;
