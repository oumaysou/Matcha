import generalQuery from '../../models/generalQuery';
import profileQuery from '../../models/profileQuery';
import { getUsernameFromToken } from '../../utils/crypt';
import userTools from '../../utils/userTools';

const getFilters = async (req, res) => {
    
    // const table = `users`;
    const myUsername = getUsernameFromToken(req);
    let minAdmired = req.params.minAdmired;
    let maxAdmired = req.params.maxAdmired;
    console.log("getfilters min: ", minAdmired);
    // console.log("gedsadsa: ", myUsername);
    console.log("getfilters max: ", maxAdmired);
    // const minAdmired = req.params.minAdmired;
    // const allMembers = await generalQuery.getFilters({table: 'users', minAdmired: minAdmiredA});
    const allMembers = await generalQuery.getFilters({table: 'users', minAdmired, maxAdmired, myUsername});
    if (!allMembers) {
        return res.send({
            success: false,
            message: "There is no member yet"
        });
    }
    else if (minAdmired > maxAdmired) {
        return res.send({
            success: false,
            message: "Your Admired filter",
        });
    }
    else if (req.params.minAdmired === '1' || req.params.maxAdmired === '0') {
        return res.send({
            success: false,
            message: "Your Admired filter",
        });
    }
    else if (req.params.minAdmired.charCodeAt(0) < '48' || req.params.minAdmired.charCodeAt(0) > '57') {
        return res.send({
            success: false,
            message: "Not valid Age filter",
        });
    }
    else if (req.params.maxAdmired.charCodeAt(0) < '48' || req.params.maxAdmired.charCodeAt(0) > '57') {
        return res.send({
            success: false,
            message: "Not valid Age filter",
        });
    }
    // console.log("\n\n\n ALL " + JSON.stringify(allMembers))
    // const index = allMembers.findIndex(member => member.username === myUsername);
    // allMembers.splice(index, 1);
    // console.log("\n\n\n ALL  APRES et ID" + "   "+index+ JSON.stringify(allMembers))

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
