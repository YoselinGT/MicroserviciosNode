import createRemoteDB from "./remote.js";
import config from "../config.js"

const store =  new createRemoteDB(config.mysqlService.host,config.mysqlService.port)

export default store;