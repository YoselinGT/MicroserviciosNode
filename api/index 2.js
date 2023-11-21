import express from 'express'
const app = express();
import config from './../config.js'
import user from './components/user/network.js'
import auth from './components/auth/network.js'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import error from "../network/errors.js";

import swaggerDoc from './swagger.json' assert { type: 'json' };

app.use(bodyParser.json())

app.use('/api/user', user)
app.use('/api/auth', auth)
app.use('/api-docs', swaggerUi.serve,swaggerUi.setup(swaggerDoc))
app.use(error)

app.listen(config.api.port, () => {
    console.log("Escuchando en el puerto ", config.api.port)
});