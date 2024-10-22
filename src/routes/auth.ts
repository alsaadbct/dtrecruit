import { Router } from 'express';
import { login } from '../controllers/auth';
import { loginValidator } from '../middlewares/formValidator';

const router = Router();

router.post('/login', loginValidator, login)
// router.get('/test', loginValidator, (req: any, res: any) => {
//     return res.status(200).json({ test: 'hhh' });
// })


export default router;