import generalQuery from '../../models/generalQuery';
import profileQuery from '../../models/profileQuery';
import { getUsernameFromToken } from '../../utils/crypt';
import userTools from '../../utils/userTools';

const getFilters = async (req, res) => {
    // console.log("getFilters ok 2");
    const myUsername = getUsernameFromToken(req);
    const minAdmired = req.params.minAdmired;

    const allMembers = await generalQuery.getFilters({table: 'users', minAdmired: '200'});
    const index = allMembers.findIndex(member => member.username === myUsername);
    allMembers.splice(index, 1);

    if (!allMembers[0]) {
        return res.send({
            success: false,
            message: "There is no member yet"
        });
    }

    const membersLikedMe = await profileQuery.whoLikedMe(myUsername);
    // const membersILike = await profileQuery.whoILike(myUsername);

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
        usersData
    });
};

module.exports = getFilters;
