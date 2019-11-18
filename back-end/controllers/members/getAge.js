import generalQuery from '../../models/generalQuery';
import profileQuery from '../../models/profileQuery';
import { getUsernameFromToken } from '../../utils/crypt';
import userTools from '../../utils/userTools';

const getAge = async (req, res) => {
    
    // const table = `users`;
    const myUsername = getUsernameFromToken(req);
    const myAge = req.generalQuery.birthday;
    let minAge = req.params.minAge;
    let maxAge = req.params.maxAge;


    // let birthday = moment(birthDate, "YYYY-MM-DD");
    // let age = moment().diff(birthday, 'years');

    // const age = moment().diff(birthday, 'years');
    console.log("\n\nbith\n\n", myAge);
    // console.log("yo\n\n", age);

    // console.log("getfilters min: ", minAdmired);
    // console.log("gedsadsa: ", myUsername);
    // console.log("getfilters max: ", maxAdmired);
    // const minAdmired = req.params.minAdmired;
    // const allMembers = await generalQuery.getFilters({table: 'users', minAdmired: minAdmiredA});
    const allMembers = await generalQuery.getAge({table: 'users', minAge, maxAge, myUsername});
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

module.exports = getAge;
