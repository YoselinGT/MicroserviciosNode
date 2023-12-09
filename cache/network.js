const express = require("express");

const router = express.Router();
const {success, error} = require( "./../network/response.js");
const {list, get, upsert} = require( "../store/redis.js");


router.get('/:tabla', (req, res, next) => {
    list(req.params.tabla)
        .then((lista) => {
            success(req, res, lista, 200)
        })
        .catch(next)
})

router.get('/:tabla/:id', (req, res, next) => {
    const {tabla, id} = req.params;

    get(tabla, id)
        .then((user) => {
            success(req, res, user, 200)
        })
        .catch(next)

})

router.put('/:tabla', (req, res, next) => {
    console.log("llegamos");
    upsert(req.params.tabla, req.body)
        .then((user) => {
            success(req, res, user, 200)
        })
        .catch(next)
})
module.exports = router;