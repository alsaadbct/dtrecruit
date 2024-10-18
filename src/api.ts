import { Router } from 'express';
import { authRouter } from './routes';
import { validateToken } from './middlewares/validateToken';

const apiRouter = Router();

apiRouter.use(validateToken)
apiRouter.use('/auth', authRouter)

export default apiRouter;