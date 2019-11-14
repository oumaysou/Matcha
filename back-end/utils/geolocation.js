import ipInfo from 'ipinfo';

const getCity = async (callback) => {
    const city = new Promise((resolve, reject) => {
        ipInfo((err, cLoc) => {
            let city = "";

            if (!err) {
                city = cLoc.city;
                resolve(city);
            }
            else {
                city = "";
                reject(err);
            }
        })
    })
    return city;
}

module.exports = getCity;
