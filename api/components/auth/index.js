import init from './controller.js'
import * as store from './../../../store/mysql.js'

const auth = init(store)

export default auth;