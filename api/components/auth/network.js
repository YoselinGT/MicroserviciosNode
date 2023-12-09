const express = require( "express");
const router = express.Router();
const {success, error} = require( "./../../../network/response.js");
const controller = require( './index.js');


router.post('/login', (req, res,next) => {
    const {username,password} = req.body;

    controller.login(username,password)
        .then((token) => {
            success(req, res, token, 200)
        })
        .catch(next)


})
module.exports = router;