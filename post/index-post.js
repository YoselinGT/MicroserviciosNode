const express  = require( 'express');
const app = express();
const config  = require( './../config.js');
const post  = require( './components/post/network.js');
const bodyParser  = require( 'body-parser');
const swaggerUi  = require( 'swagger-ui-express');
const error  = require( "../network/errors.js");

import swaggerDoc from './swagger.json' assert { type: 'json' };

app.use(bodyParser.json())

app.use('/api/post', post)
app.use('/api-docs', swaggerUi.serve,swaggerUi.setup(swaggerDoc))
app.use(error)

app.listen(config.post.port, () => {
    console.log("Escuchando en el puerto ", config.post.port)
});