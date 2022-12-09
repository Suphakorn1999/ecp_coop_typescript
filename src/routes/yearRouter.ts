import { Router } from 'express';
import { createYear, getAllYear,updateYear } from '../controller/yearController';
const {verifyToken} = require('../middlewares/jwtHandler')

const router = Router();

router.post('/',verifyToken, createYear);
router.get('/',verifyToken, getAllYear);
router.post('/update',verifyToken, updateYear);


export default router;