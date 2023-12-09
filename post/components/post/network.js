const express = require( "express");

const router = express.Router();
const {success, error} = require( "../../../network/response.js");
const controller = require( './index.js');


router.get('/', (req, res,next) => {
    controller.list()
        .then((data) => {
            success(req, res, data, 200)
        })
        .catch(next)


})
module.exports = router;