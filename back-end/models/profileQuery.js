import generalQuery from './generalQuery';
import moment from 'moment';
import userTools from '../utils/userTools';


const whoBlockedMe = async (username) => {
    const results = await generalQuery.get({table: 'blocks', field: 'block', value: username});
    if (results) {
        let users = results.map(result => result.blockedBy);
        return (users);
    }
    return ;
}

const getBlockedByMe = async (username) => {
    const results = await generalQuery.get({table: 'blocks', field: 'blockedBy', value: username});
    if (results) {
        let users = results.map(result => result.blocked);
        return (users);
    }
    return ;
}

const whoVisitedMe = async (username) => {
    const results = await generalQuery.get({table: 'visits', field: 'visit', value: username});

    let members = [];
    if (results) {
        let users = results.map(result => {
            return result;
        });
        for (let index in users) {
            let userInfo = await generalQuery.get({table: 'users', field: 'username', value: users[index].visitedBy });
            members.push({ username: users[index].visitedBy, avatar: userInfo[0].avatar, date: users[index].date });
        }
        members = members.reverse().slice(0, 10);
        return members;
    }
    return ;
}

const setNewVisit = async (myUsername, username) => {
    const date = moment().format('L LT');
    const userData = { visit: username, visitedBy: myUsername, date};
    const result = await generalQuery.insert({ table: 'visits', userData });
    return result.affectedRows > 0 ? true : false;
}

const getTags = async (username) => {
    const results = await generalQuery.get({table: 'tags', field: 'taggedBy', value: username});
    if (results) {
        let tags = results.map(result => result.tag);
        return (tags);
    }
    return ;
}

const setNewTag = async (tag, username) => {
    const userData = { tag, taggedBy: username };
    const result = await generalQuery.insert({ table: 'tags', userData });
    return result.affectedRows > 0 ? true : false;
}

const whoLikedMe = async (username) => {
    const results = await generalQuery.get({table: 'likes', field: '`like`', value: username});
    if (results) {
        let users = results.map(result => result.likedBy);
        return (users);
    }
}

const whoILike = async (username) => {
    const results = await generalQuery.get({table: '`likes`', field: '`likedBy`', value: username});
    if (results) {
        let users = results.map(result => result.like);
        return (users);
    }
    return ;
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
        const popularity = await userTools.setPopularity(myUsername, username, 'add');

        result = await generalQuery.update({
            table: 'users',
            field: 'popularity',
            value: popularity,
            where: 'username',
            whereValue: myUsername
        });
    }
    else {
        const likeId = await getLikeId(myUsername, username);
        result = await generalQuery.deleter({ table: '`likes`', field: 'id', value: likeId });
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
    const results = await generalQuery.get({table: 'photos', field: 'photoBy', value: username});
    if (results) {
        let photos = results.map(result => result.photo);
        return (photos);
    }
    return ;
}

const setNewPhoto = async (photo, username) => {
    const userData = { photo, photoBy: username };
    const result = await generalQuery.insert({ table: 'photos', userData });
    return result.affectedRows > 0 ? true : false;
}

module.exports = {
    whoBlockedMe,
    getBlockedByMe,
    whoVisitedMe,
    setNewVisit,
    getTags,
    setNewTag,
    whoLikedMe,
    whoILike,
    setNewLike,
    getPhotos,
    setNewPhoto
}
