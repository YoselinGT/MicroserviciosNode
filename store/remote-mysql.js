const createRemoteDB = require( "./remote.js");
const config = require( "../config.js");

const store =  new createRemoteDB(config.mysqlService.host,config.mysqlService.port)

module.exports = store;