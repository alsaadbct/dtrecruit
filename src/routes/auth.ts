import { Router } from 'express';
import { login } from '../controllers/auth';
import { loginValidator } from '../middlewares/formValidator';

const router = Router();

router.post('/login', loginValidator, login)



export default router;