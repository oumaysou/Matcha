import { getUsernameFromToken } from '../../utils/crypt';
import profileQuery from '../../models/profileQuery';

const getMessages = async (req, res) => {
    const myUsername = getUsernameFromToken(req);
    const username = req.params.username;
    if (!myUsername)
        return res.send({ success: false, message: "The profile doesn't exist" });
    const allMessages = await profileQuery.getMessages(myUsername, username)
    if (allMessages) {
    return res.send({
        success: true,
        allMessages
    });
    }
}

module.exports = getMessages;