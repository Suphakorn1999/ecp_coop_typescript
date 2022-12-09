import { Router } from 'express';
import { createAdmin, loginAdmin,allcount } from '../controller/adminController';
const { verifyTokenAdmin,verifyToken } = require('../middlewares/jwtHandler');

const router = Router();

router.post("/",verifyToken, createAdmin);
router.post("/login", loginAdmin);
router.get("/verify", verifyTokenAdmin);
router.get("/allcount",verifyToken, allcount);


export default router;

