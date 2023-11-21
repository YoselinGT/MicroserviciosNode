import init from './controller.js'
import config from './../../../config.js'

let store;
if (config.remoteDB === true) {
    store = require('./../../../store/remote-mysql.js');
} else {
    store = require('./../../../store/mysql.js');
}


const user = init(store)

export default user;