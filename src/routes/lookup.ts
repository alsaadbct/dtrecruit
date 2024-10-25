import { Router } from 'express';
import { validateToken } from '../middlewares/validateToken';
import { lookup } from '../controllers/lookup';

const router = Router();

router.get('', lookup)

export default router;