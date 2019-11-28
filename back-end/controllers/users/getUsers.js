import generalQuery from '../../models/generalQuery';

const getUsers = async (req, res) => {

    const allMembers = await generalQuery.getAll({table: 'users'});

    if (!allMembers[0]) {
        return res.send({
            success: false,
            message: "There is no member yet"
        });
    }

    let usersData = [];
    usersData = allMembers;

    return res.send({
        success: true,
        usersData
    });
};

module.exports = getUsers;
