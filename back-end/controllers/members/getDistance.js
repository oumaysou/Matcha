import generalQuery from '../../models/generalQuery';
import profileQuery from '../../models/profileQuery';
import { getUsernameFromToken } from '../../utils/crypt';
import userTools from '../../utils/userTools';

const getDistance = async (req, res) => {
    const myUsername = getUsernameFromToken(req);
    let myLat = req.params.myLat;
    let myLong = req.params.myLong;
    let minMax = req.params.myKm;

    console.log("latitud back", myLat);
    console.log("longitud back", myLong);
    console.log("minmax back", minMax);

    if (minMax === '0')
        minMax = '10000000000000';
    else if (minMax === '20')
        minMax = '10';
    else if (minMax === '50')
        minMax = '25';
    else if (minMax === '100')
        minMax = '150';

    const allMembers = await generalQuery.getDistance({table: 'users', myLat, myLong, minMax});
    // console.log("asdasd", JSON.stringify(allMembers));
    
    const index = allMembers.findIndex(member => member.username === myUsername);
    // let myLocation = allMembers[index].location;
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
        usersData,
    });
};

module.exports = getDistance;