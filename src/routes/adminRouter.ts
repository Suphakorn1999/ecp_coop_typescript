import { Router } from 'express';
import { createAdmin, loginAdmin } from '../controller/adminController';
const { verifyTokenAdmin } = require('../middlewares/jwtHandler');

const router = Router();

router.post("/", createAdmin);
router.post("/login", loginAdmin);
router.get("/verify", verifyTokenAdmin);


export default router;

