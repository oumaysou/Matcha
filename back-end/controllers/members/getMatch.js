import generalQuery from '../../models/generalQuery';
import profileQuery from '../../models/profileQuery';
import { getUsernameFromToken } from '../../utils/crypt';
import userTools from '../../utils/userTools';

const getMatch = async (req, res) => {
    const myUsername = getUsernameFromToken(req);
    let myLat = req.params.myLat;
    let myLong = req.params.myLong;
    let myAge = req.params.myAge;
    let oSex = req.params.oSex;
    let myPopularity = req.params.myPopularity;
    let minMax = '1000000';
    let myMinPopularity = req.params.myPopularity - 300;
    let myMaxPopularity = myMinPopularity + 600;
    let myMinAge = myAge.split('-')[0] - 6;
    let myMaxAge = myMinAge + 11;
    let myGender = req.params.myGender;
    let myGenderMale = "male";
    let myGenderFemale = "Female";
    // let mysexGayA;
    // let mysexGayB;
    // let mysexBi;
    let Change;


    console.log("minAge back", myMinAge);
    console.log("maxAge back", myMaxAge);
    console.log("latitud back", myLat);
    console.log("longitud back", myLong);
    console.log("minmax back", minMax);
    // console.log("age back", myAge);
    // console.log("popu back", myPopularity);
    console.log("popu back min", myMinPopularity);
    console.log("popu back max", myMaxPopularity);
    console.log("sex back", oSex);
    console.log("sex back", myGender);

    if (myGender === myGenderMale) {
        Change = "female"; }
    else if (myGender === myGenderFemale) {
        Change === "male"; }
    
    // else if (myGender )
    

    console.log("sex back GENDERRRR", myGender);
    // console.log("sex back GENDERRRRCHANGE", myGenderChange);
    console.log("sex back GENDERRRRCHANGE", Change);


    const allMembers = await generalQuery.getMatch({table: 'users', myLat, myLong, minMax, myMinAge, myMaxAge, myMinPopularity, myMaxPopularity, oSex, myUsername, Change});
    // console.log("asdasd", JSON.stringify(allMembers));
    
    // const index = allMembers.findIndex(member => member.username === myUsername);
    // let myLocation = allMembers[index].location;
    // allMembers.splice(index, 1);

    if (!allMembers[0]) {
        return res.send({
            success: false,
            message: "Update your profile for a better experience !"
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
        usersData,
    });
};

module.exports = getMatch;