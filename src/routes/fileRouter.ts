import { Router } from 'express';
import {  getFile } from '../controller/fileController';


const router = Router();

router.get('/', getFile);

export default router;
