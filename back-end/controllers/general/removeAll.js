import profileQuery from '../../models/profileQuery';
import generalQuery from '../../models/generalQuery'
import { getUsernameFromToken } from '../../utils/crypt';
import userTools from '../../utils/userTools';

const removeAll = async (req, res) => {
    const myUsername = getUsernameFromToken(req);
    console.log("\n\n User " + myUsername)
    if (myUsername) {
        const result1 = await generalQuery.update({ table: 'users', field: 'notifLike', value: 0, where: 'username', whereValue: myUsername })
        const result2 = await generalQuery.update({ table: 'users', field: 'notifVisit', value: 0, where: 'username', whereValue: myUsername })
        const result3 = await generalQuery.update({ table: 'users', field: 'notifMsg', value: 0, where: 'username', whereValue: myUsername })
        // console.log("\n\n\n\n\n" + JSON.stringify(result1))
        // if (result1.affectedRows > 0 && result2.affectedRows > 0 && result3.affectedRows > 0) {
        return res.send({
            success: true,
            message: `All notifications removed`,
        })
        // }
    }
    return res.send({
        success: false,
        message: `We can't remove all notifications`
    })
}

export default removeAll;