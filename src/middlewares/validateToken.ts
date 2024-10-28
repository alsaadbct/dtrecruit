import { NextFunction, Response } from 'express';
import { getSessionBasedOnToken } from '../utils/auth';
import { sendError } from '../utils/helper';

const validateToken = async (req: any, res: Response, next: NextFunction) => {

    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            console.log("token  not existing")
            return sendError(res, 401, 'Unauthorized, token missing')
        }

        const session = await getSessionBasedOnToken(token);

        if (!session) {
            console.log("Invalid session")

            return sendError(res, 401, 'Invalid session');
        }

        if (session && session.expiresAt < new Date()) {
            console.log("Session expired")

            return sendError(res, 401, 'Session expired');
        }

        req.user = session?.userId;
        next();
    } catch (error) {
        console.log(error)
        return sendError(res, 401, 'Unauthorized, token missing')
    }
}

export {
    validateToken,
}