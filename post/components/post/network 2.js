import express from "express";

const router = express.Router();
import {success, error} from "../../../network/response.js";
import controller from './index.js';


router.get('/', (req, res,next) => {
    controller.list()
        .then((data) => {
            success(req, res, data, 200)
        })
        .catch(next)


})
export default router;