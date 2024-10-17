import { Router } from 'express';
import { authRouter } from './routes';

const apiRouter = Router();

apiRouter.use('/auth', authRouter)

export default apiRouter;