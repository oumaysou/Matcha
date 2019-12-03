import generalQuery from '../../models/generalQuery';
import profileQuery from '../../models/profileQuery';
import { getUsernameFromToken } from '../../utils/crypt';
import userTools from '../../utils/userTools';



// import moment from 'moment';


const getAge = async (req, res) => {
    
    // const table = `users`;
    const myUsername = getUsernameFromToken(req);
    let minAge = 2018 - req.params.maxAge;
    let maxAge = 2018 - req.params.minAge;
    // let DDMM = "-12-31";
    // let minDDMMYY = minAge + DDMM;
    // let maxDDMMYY = maxAge + DDMM;
    
    // let minAge = moment().diff(req.params.minAge, "YYYY-MM-DD");

    // let minBirthday = moment(minAge, "years");
    // const age = moment().diff(minBirthday, "YYYY-MM-DD");
    // console.log(age);

    // let age = moment().diff(minAge, 'years');
    // let birthday = moment(age, "YYYY-MM-DD");
    // console.log("dasadsdasda", minDDMMYY);

    // console.log("dasadsdasda", minDDMM);
    console.log("getage min              ", minAge);
    console.log("getage max", maxAge);
    // console.log("birthhhh", birthday);
    // console.log("aggggegeg", age);
    console.log("taketu min", req.params.minAge.charCodeAt(0));
    console.log("taketu max", req.params.maxAge.charCodeAt(0));
    const allMembers = await generalQuery.getAge({table: 'users', minAge, maxAge, myUsername});
    if (!allMembers) {
        return res.send({
            success: false,
            message: "There is no member yet"
        });
    }
    else if (minAge > maxAge) {
        return res.send({
            success: false,
            message: "Your age filter",
        });
    }
    else if (req.params.minAge === '0' && req.params.maxAge === '0') {
        return res.send({
            success: false,
            message: "Your age filter",
        });
    }
    else if (req.params.minAge.charCodeAt(0) < '48' || req.params.minAge.charCodeAt(0) > '57') {
        return res.send({
            success: false,
            message: "Not valid Age filter",
        });
    }
    else if (req.params.maxAge.charCodeAt(0) < '48' || req.params.maxAge.charCodeAt(0) > '57') {
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

module.exports = getAge;
