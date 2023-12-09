const init = require ('./controller.js');
const store = require ('./../../../store/mysql.js');


const auth = init(store)

module.exports = auth;