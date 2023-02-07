import { Router } from 'express';
import { createAdmin, loginAdmin, allcount, gennerateToken } from '../controller/adminController';
const { verifyTokenAdmin,verifyToken } = require('../middlewares/jwtHandler');

const router = Router();

router.post("/", verifyTokenAdmin, createAdmin);
router.post("/login", loginAdmin);
router.get("/verify", verifyTokenAdmin);
router.get("/allcount", verifyTokenAdmin, allcount);
router.get("/token", gennerateToken);


export default router;

