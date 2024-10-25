import { Router } from 'express';
import { authRouter, userRouter, lookupRouter } from './routes';

const apiRouter = Router();


apiRouter.use('/auth', authRouter)
apiRouter.use('/user', userRouter)
apiRouter.use('/lookup', lookupRouter)


export default apiRouter;