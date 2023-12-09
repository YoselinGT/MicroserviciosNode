const express = require( 'express');
const app = express();
const config = require( './../config.js')
const user = require( './components/user/network.js');
const auth = require( './components/auth/network.js');
const bodyParser = require( 'body-parser');
const swaggerUi = require( 'swagger-ui-express');
const error = require( "../network/errors.js");

const swaggerDoc = require('./swagger.json');

app.use(bodyParser.json())

app.use('/api/user', user)
app.use('/api/auth', auth)
app.use('/api-docs', swaggerUi.serve,swaggerUi.setup(swaggerDoc))
app.use(error)

app.listen(config.api.port, () => {
    console.log("Escuchando en el puerto ", config.api.port)
});