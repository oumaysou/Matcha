import generalQuery from '../../models/generalQuery';
import profileQuery from '../../models/profileQuery';
import { getUsernameFromToken } from '../../utils/crypt';
import userTools from '../../utils/userTools';
// import moment from 'moment';

const updateTag = async (req, res) => {
    
    // const table = `users`;
    const myUsername = getUsernameFromToken(req);
    let tagName = req.params.nam;

    console.log("TAG NAME:", tagName);
    console.log("TAG NAME:", myUsername);

    // console.log("birthhhh", birthday);
    // console.log("aggggegeg", age);
    

    // let birthday = moment(birthDate, "YYYY-MM-DD");
    // let age = moment().diff(birthday, 'years');

    
    // console.log("yo\n\n", age);

    
    // let error = '';


    // console.log("getfilters min: ", minAdmired);
    // console.log("gedsadsa: ", myUsername);
    // console.log("getfilters max: ", maxAdmired);
    // const minAdmired = req.params.minAdmired;
    // const allMembers = await generalQuery.getFilters({table: 'users', minAdmired: minAdmiredA});
    const allMembers = await generalQuery.updateTag({table: 'users', tags: 'tags', tagName, myUsername});
    if (!allMembers[0]) {
        return res.send({
            success: false,
            message: "There is no member yet"
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

module.exports = updateTag;
