import { Router } from 'express';
import { createUsers, getAllUsers, updateUsers, deleteUser, assignPassword } from '../controllers/userManagement';
import { validateToken } from '../middlewares/validateToken';
import { userValidator } from '../middlewares/validation/formValidator';

const router = Router();

router.post('/createUsers', validateToken, createUsers)
router.get('/getAllUser', validateToken, userValidator, getAllUsers)
router.delete('/deleteUser/:userId', validateToken, userValidator, deleteUser)
router.put('/updateUser/:userId', validateToken, updateUsers)
router.put('/assignPassword/:userId', assignPassword)

export default router;