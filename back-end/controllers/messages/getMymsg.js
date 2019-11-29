import { getUsernameFromToken } from '../../utils/crypt';
import profileQuery from '../../models/profileQuery';

const getMymsg = async (req, res) => {
    const myUsername = getUsernameFromToken(req);
    let nbMsg = 0;
    try {
        if (!myUsername)
            return res.send({ success: true, message: "The profile doesn't exist" });
        const allMessage = await profileQuery.getMymsgQ(myUsername)
        allMessage.map(user => {
            nbMsg += 1;
        })
        return res.send({
            success: true,
            allMessage,
            nbMsg
        });
    }
    catch (err) {
        throw new Error("BIM BAM BOOM", err)
    }
}

module.exports = getMymsg;
