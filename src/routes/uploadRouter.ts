import { Router } from "express";
import {uploadfile} from '../controller/uploadController';
const {verifyTokenStudent} = require('../middlewares/jwtHandler')
const router = Router();

router.post('/', verifyTokenStudent ,uploadfile);


export default router;