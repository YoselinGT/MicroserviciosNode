const jwt = require( 'jsonwebtoken');
const config = require( "../config.js");
const err = require( "../utils/error.js");

const secreto = config.jwt.secret;
const sign = (data)  => {
    return jwt.sign(data,secreto)
}

const verifica = (token) => {
    return jwt.verify(token,secreto)
}

const getToken = (auth) => {
    if(!auth){
        throw err("No viene token",400)
    }
    if(auth.indexOf('Bearer ') === -1){
        throw err("Formato invalido",401)
    }

    let token = auth.replace('Bearer ','')
    return token;
}

const decodeHeader = (req) => {
    const authorization = req.headers.authorization || "";
    const token = getToken(authorization);
    const decode = verifica(token)

    req.user = decode;

    return decode;
}

const check = {
    own: (req, owner) => {
        const decoded = decodeHeader(req);
        if(decoded.id !== owner){
            throw err("No puedes hacer esto",401)
        }
    },
    logged:  (req) => {
        const decoded = decodeHeader(req);
    }

}

module.exports = {sign,check}