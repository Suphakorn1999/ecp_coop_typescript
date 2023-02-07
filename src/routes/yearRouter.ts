import { Router } from 'express';
import { createYear, getAllYear,updateYear } from '../controller/yearController';
const { verifyToken, verifyTokenAdmin } = require('../middlewares/jwtHandler')

const router = Router();

router.post('/', verifyTokenAdmin, createYear);
router.get('/',verifyToken, getAllYear);
router.post('/update', verifyTokenAdmin, updateYear);


export default router;