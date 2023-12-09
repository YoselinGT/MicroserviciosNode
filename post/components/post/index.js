const init = require( './controller.js');
const store = require( '../../../store/mysql.js');

const post = init(store)

module.exports = post;