import { Router } from 'express';
import { createUsers } from '../controllers/userManagement';
import { validateToken } from '../middlewares/validateToken';
import { userValidator } from '../middlewares/validation/formValidator';

const router = Router();

router.get('', validateToken, userValidator, createUsers)
// router.get('/test', loginValidator, (req: any, res: any) => {
//     return res.status(200).json({ test: 'hhh' });
// })


export default router;