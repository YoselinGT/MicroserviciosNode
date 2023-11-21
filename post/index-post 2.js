import express from 'express'
const app = express();
import config from './../config.js'
import post from './components/post/network.js'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import error from "../network/errors.js";

import swaggerDoc from './swagger.json' assert { type: 'json' };

app.use(bodyParser.json())

app.use('/api/post', post)
app.use('/api-docs', swaggerUi.serve,swaggerUi.setup(swaggerDoc))
app.use(error)

app.listen(config.post.port, () => {
    console.log("Escuchando en el puerto ", config.post.port)
});