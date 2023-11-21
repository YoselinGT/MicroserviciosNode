import express from "express";
import bodyParser from "body-parser";
import router from './network.js'

import config from './../config.js'

const app = express();

app.use(bodyParser.json());

app.use(router)

app.listen(config.mysqlService.port, () => {
    console.log("Servicio de mysql escuchando en el puerto ",config.mysqlService.port)
})