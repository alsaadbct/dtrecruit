import { NextFunction, Response } from 'express';
import { prisma } from '../utils/db';
import { getSessionBasedOnToken, LOGIN_PATH } from '../utils/auth';

const validateToken = async (req: any, res: Response, next: NextFunction) => {

    const token = req.headers['Authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json('Unauthorized, token missing');
    }
    const session = await getSessionBasedOnToken(token);
    if (!session) {
        return res.status(401).json('Invalid session');
    }
    if (session && session.expiresAt < new Date()) {
        return res.status(401).json('Session expired');
    }
    req.user = session?.userId;
    next();
}

export {
    validateToken,
}