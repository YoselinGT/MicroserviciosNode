import express from "express";

const router = express.Router();
import {success, error} from "./../../../network/response.js";
import controller from './index.js';


router.post('/login', (req, res,next) => {
    const {username,password} = req.body;

    controller.login(username,password)
        .then((token) => {
            success(req, res, token, 200)
        })
        .catch(next)


})
export default router;