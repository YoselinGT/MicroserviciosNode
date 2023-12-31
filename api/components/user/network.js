const express = require("express");

const router = express.Router();
const secure = require('./secure.js');
const {success, error} = require("./../../../network/response.js");
const user = require( './index.js');


router.get('/', (req, res,next) => {
    user.list()
        .then((lista) => {
            success(req, res, lista, 200)
        })
        .catch(next)
})

router.get('/:id', (req, res,next) => {

    const {id} = req.params;

    user.get(id)
        .then((user) => {
            success(req, res, user, 200)
        })
        .catch(next)


})

router.post('/', (req, res,next) => {
    user.upsert(req.body)
        .then((user) => {
            success(req, res, user, 200)
        })
        .catch(next)


})

router.put('/',
    secure('update'),
    (req, res,next) => {
    user.upsert(req.body)
        .then((user) => {
            success(req, res, user, 200)
        })
        .catch(next)

})

router.post('/follow/:id',
    secure('follow'),
    (req, res,next) => {
        user.follow(parseInt( req.user.id,10), parseInt( req.params.id))
            .then((user) => {
                success(req, res, user, 201)
            })
            .catch(next)

    })

router.post('/:id/following',
    (req, res,next) => {
        user.following(parseInt( req.params.id,10))
            .then((user) => {
                success(req, res, user, 201)
            })
            .catch(next)

    })


module.exports = router;