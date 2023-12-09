const init = require('./controller.js');
const config = require('./../../../config.js');

let store, cache;
if (config.remoteDB === true) {
    store = require('./../../../store/remote-mysql.js');
    cache = require('./../../../store/remote-cache.js');
} else {
    store = require('./../../../store/mysql.js');
    cache = require('./../../../store/redis.js');
}


const user = init(store,cache)

module.exports = user;