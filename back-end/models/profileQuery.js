import generalQuery from './generalQuery';
import moment from 'moment';
import userTools from '../utils/userTools';


const whoBlockedMe = async (username) => {
    const results = await generalQuery.get({ table: 'blocks', field: 'block', value: username });
    if (results) {
        let users = results.map(result => result.blockedBy);
        return (users);
    }
    return;
}

const getBlockedByMe = async (username) => {
    const results = await generalQuery.get({ table: 'blocks', field: 'blockedBy', value: username });
    if (results) {
        let users = results.map(result => result.blocked);
        return (users);
    }
    return;
}

const whoVisitedMe = async (username) => {
    try {
        const results = await generalQuery.get({ table: 'visits', field: 'visit', value: username });

        let members = [];
        // console.log("\n\nResult ==>\n\n" + JSON.stringify(results) + "\n\n\n\n")
        if (results) {

            let users = results.map(result => {
                return result;
            });

            for (let index in users) {


                let userInfo = await generalQuery.get({ table: 'users', field: 'username', value: users[index].visitedBy });
                // console.log("\n\nuserINFOS=>\n" + userInfo + "\n\n\n\n")
                members.push({ username: users[index].visitedBy, avatar: userInfo[0].avatar, date: users[index].date });

            }
            // console.log("\n\n\nMEMBERS\n\n" + members + "\n\n\n")
            members = members.reverse().slice(0, 10);
            return members;
        }
        return;
    }
    catch (err) { console.error('Error ProfileQuery => ' + err) }
}

const setNewVisit = async (myUsername, username) => {
    const date = moment().format('L LT');
    const userData = { visit: username, visitedBy: myUsername, date };
    const result = await generalQuery.insert({ table: 'visits', userData });
    const tableMe = await generalQuery.get({ table: 'users', field: 'username', value: username })
    // console.log("\n\n\n\n" + JSON.stringify(visitr))
    // const newVisit = visit[0] ? 1 : 0;
    const notif = await generalQuery.update({
        table: 'users',
        field: 'notifVisit',
        value: tableMe[0].notifVisit + 1,
        where: 'username',
        whereValue: username
    })
    return result.affectedRows > 0 ? true : false;
}

const getTags = async (username) => {
    const results = await generalQuery.get({ table: 'tags', field: 'taggedBy', value: username });
    if (results) {
        let tags = results.map(result => result.tag);
        return (tags);
    }
    return;
}

const setNewTag = async (tag, username) => {
    const userData = { tag, taggedBy: username };
    const result = await generalQuery.insert({ table: 'tags', userData });
    return result.affectedRows > 0 ? true : false;
}

const whoLikedMe = async (username) => {
    const results = await generalQuery.get({ table: 'likes', field: '`like`', value: username });
    if (results) {
        let users = results.map(result => result.likedBy);
        return (users);
    }
}

const whoILike = async (username) => {
    const results = await generalQuery.get({ table: '`likes`', field: '`likedBy`', value: username });
    if (results) {
        let users = results.map(result => result.like);
        return (users);
    }
    return;
}

const getLikeId = async (myUsername, username) => {
    const getId = await generalQuery.getId({
        table: '`likes`',
        field: 'likedBy',
        value: myUsername,
        fieldBis: '`like`',
        valueBis: username
    });
    return getId;
}

const setNewLike = async (myUsername, username) => {
    const likedByMe = await whoILike(myUsername);
    const userData = { like: username, likedBy: myUsername };
    let result;

    if (!likedByMe.includes(username)) {
        result = await generalQuery.insert({ table: '`likes`', userData });
        const oldNotifLike = await generalQuery.get({ table: 'users', field: 'username', value: myUsername })
        const notifLike = oldNotifLike[0].notifLike + 1;
        const popularity = await userTools.setPopularity(myUsername, username, 'add');

        result = await generalQuery.update({
            table: 'users',
            field: 'popularity',
            value: popularity,
            where: 'username',
            whereValue: myUsername
        });
        const updateLikeNotif = await generalQuery.update({
            table: 'users',
            field: 'notifLike',
            value: notifLike,
            where: 'username',
            whereValue: username
        });
    }
    else {
        const likeId = await getLikeId(myUsername, username);
        result = await generalQuery.deleter({ table: '`likes`', field: 'id', value: likeId.id });
        const popularity = await userTools.setPopularity(myUsername, username, 'remove');

        result = await generalQuery.update({
            table: 'users',
            field: 'popularity',
            value: popularity,
            where: 'username',
            whereValue: myUsername
        });
    }
    return result.affectedRows > 0 ? true : false;
}

const getPhotos = async (username) => {
    const results = await generalQuery.get({ table: 'photos', field: 'photoBy', value: username });
    if (results) {
        let photos = results.map(result => result.photo);
        return (photos);
    }
    return;
}

const setNewPhoto = async (photo, username) => {
    const userData = { photo, photoBy: username };
    const result = await generalQuery.insert({ table: 'photos', userData });
    return result.affectedRows > 0 ? true : false;
}


const UnsetLike = async (myUsername, username) => {
    const likedByMe = await whoILike(myUsername);
    const userData = { like: username, likedBy: myUsername };
    let result;

    if (!likedByMe.includes(username)) {
        result = null;
        const oldNotifLike = await generalQuery.get({ table: 'users', field: 'username', value: myUsername })
        const notifLike = oldNotifLike[0].notifLike - 1;
        const popularity = await userTools.setPopularity(myUsername, username, 'add');

        result = await generalQuery.update({
            table: 'users',
            field: 'popularity',
            value: popularity,
            where: 'username',
            whereValue: myUsername
        });
        const updateLikeNotif = await generalQuery.update({
            table: 'users',
            field: 'notifLike',
            value: notifLike,
            where: 'username',
            whereValue: username
        });
    }
    else {
        const oldNotifLike = await generalQuery.get({ table: 'users', field: 'username', value: myUsername })
        const notifLike = oldNotifLike[0].notifLike - 1;
        const likeId = await getLikeId(myUsername, username);
        const likeId1 = likeId[0].id;
        result = await generalQuery.deleter({ table: '`likes`', field: 'id', value: likeId1 });
        const popularity = await userTools.setPopularity(myUsername, username, 'remove');

        result = await generalQuery.update({
            table: 'users',
            field: 'popularity',
            value: popularity,
            where: 'username',
            whereValue: myUsername
        });
        const updateLikeNotif = await generalQuery.update({
            table: 'users',
            field: 'notifLike',
            value: notifLike,
            where: 'username',
            whereValue: username
        });
    }
    return result.affectedRows > 0 ? true : false;
}

const getMessages = async (myUsername, username) => {

    const msgS = await generalQuery.getBis({ table: 'messages', field: 'messageBy', value: myUsername, fieldBis: 'messageTo', valueBis: username })
    const msgR = await generalQuery.getBis({ table: 'messages', field: 'messageBy', value: username, fieldBis: 'messageTo', valueBis: myUsername })
    let allMessages = msgS.concat(msgR)
    return allMessages;
}

const getMymsgQ = async (myUsername) => {

    const allMessages = await generalQuery.get({ table: 'messages', field: 'messageTo', value: myUsername })
    return allMessages;
}

module.exports = {
    whoBlockedMe,
    getBlockedByMe,
    whoVisitedMe,
    setNewVisit,
    UnsetLike,
    getTags,
    setNewTag,
    whoLikedMe,
    whoILike,
    setNewLike,
    getPhotos,
    setNewPhoto,
    getMessages,
    getMymsgQ
}
