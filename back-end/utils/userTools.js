import generalQuery from '../models/generalQuery';

const getUserData = async (field, value) => {
    const user = await generalQuery.get({table: 'users', field, value});
    return user[0];
}

const removeConfidentials = (user, username) => {
    if (user.username !== username)
        delete user.email;
    delete user.password;
    return user;
}

const setPopularity = async (myUsername, aUsername, action) => {
    const myProfile = await generalQuery.get({ table: 'users', field: 'username', value: myUsername });
    const aProfile = await generalQuery.get({ table: 'users', field: 'username', value: aUsername });
    let score = myProfile[0].popularity;

    if (action === 'add') {
        if (myProfile[0].popularity < aProfile[0].popularity)
            score += 2;
        else if (myProfile[0].popularity >= aProfile[0].popularity)
            score += 1;
        if (myProfile[0].age + 2 <= aProfile[0].age || myProfile[0].age - 2 >= aProfile[0].age)
            score += 2
        else
            score += 1;
    }
    else if (action === 'remove') {
        if (myProfile[0].popularity < aProfile[0].popularity)
            score -= 2;
        else if (myProfile[0].popularity >= aProfile[0].popularity)
            score -= 1;
        if (myProfile[0].age + 2 <= aProfile[0].age || myProfile[0].age - 2 >= aProfile[0].age)
            score -= 2
        else
            score -= 1;
    }
    return score;
}

module.exports = {
    getUserData,
    removeConfidentials,
    setPopularity
}
