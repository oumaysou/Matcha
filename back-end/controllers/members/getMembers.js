import generalQuery from '../../models/generalQuery';
import profileQuery from '../../models/profileQuery';
import { getUsernameFromToken } from '../../utils/crypt';
import userTools from '../../utils/userTools';

const getMembers = async (req, res) => {
    const myUsername = getUsernameFromToken(req);

    const allMembers = await generalQuery.getAll({table: 'users'});
    const index = allMembers.findIndex(member => member.username === myUsername);
    let myLocation = allMembers[index].location;
    let myOrientation = allMembers[index].orientation;
    let myAge = allMembers[index].birthday;
    let myPopularity = allMembers[index].popularity;
    let myGender = allMembers[index].gender;
    // console.log("asdadsads\n\n", myOrientation);
    allMembers.splice(index, 1);

    if (!allMembers[0]) {
        return res.send({
            success: false,
            message: "There is no member yet"
        });
    }

    const membersLikedMe = await profileQuery.whoLikedMe(myUsername);
    const membersILike = await profileQuery.whoILike(myUsername);

    let usersData = [];
    allMembers.forEach(member => {
        member = userTools.removeConfidentials(member, member.username);
        let likedMe;
        if (membersLikedMe.includes(member.username) && membersLikedMe.includes(member.username))
            return usersData.push({ likedMe: true, likedByMe: true, member });
        else if (membersLikedMe.includes(member.username) && !membersLikedMe.includes(member.username))
            return usersData.push({ likedMe: true, likedByMe: false, member });
        else
            return usersData.push({ likedMe: false, likedByMe: false, member });
    })

    return res.send({
        success: true,
        usersData,
        myLocation,
        myOrientation,
        myGender,
        myAge,
        myPopularity,
        myUsername
    });
};

module.exports = getMembers;