import { NextFunction, Response } from 'express';
import { getSessionBasedOnToken } from '../utils/auth';
import { sendError } from '../utils/helper';

const validateToken = async (req: any, res: Response, next: NextFunction) => {

    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return sendError(res, 401, 'Unauthorized, token missing')
    }
    const session = await getSessionBasedOnToken(token);

    if (!session) {
        return sendError(res, 401, 'Invalid session');
    }
    if (session && session.expiresAt < new Date()) {
        return sendError(res, 401, 'Session expired');
    }
    req.user = session?.userId;
    next();
}

export {
    validateToken,
}