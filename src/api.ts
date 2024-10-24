import { Router } from 'express';
import { authRouter } from './routes';
import { userRouter } from './routes';
import { validateToken } from './middlewares/validateToken';

const apiRouter = Router();


apiRouter.use('/auth', authRouter)
apiRouter.use('/user', userRouter)


export default apiRouter;