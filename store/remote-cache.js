const createRemoteDB = require( "./remote.js");
const config = require( "../config.js");

const store =  new createRemoteDB(config.cacheService.host,config.cacheService.port)

module.exports = store;