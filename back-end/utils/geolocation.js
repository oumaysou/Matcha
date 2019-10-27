import ipInfo from 'ipinfo';

const getLocation = async (callback) => {
    const location = new Promise((resolve, reject) => {
        ipInfo((err, cLoc) => {
            let tab = [];

            if (!err) {
              const loc = cLoc.loc.split(',');
              tab[0] = parseFloat(loc[0]);
              tab[1] = parseFloat(loc[1]);
            }
            else {
              tab[0] = 0;
              tab[1] = 0;
              reject(err);
            }
            const result = tab.join();
            resolve(result);
        })
    })
    return location;
}

module.exports = getLocation;
