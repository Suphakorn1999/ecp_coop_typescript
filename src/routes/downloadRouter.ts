import { Router } from 'express';
import { downloadFile } from '../controller/downloadController';
const router = Router();

router.get('/', downloadFile);

export default router;
