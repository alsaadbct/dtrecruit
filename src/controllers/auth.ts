import { Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import { prisma } from '../utils/db';
import { createOrUpdateSession, createUser, getUserWithSessionsByUsername, SESSION_DURATION } from '../utils/auth';
import crypto from 'crypto';

export const login = async (req: any, res: Response): Promise<Response> => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        })
    }
    const userMatch = await getUserWithSessionsByUsername(req.body?.username, true);
    let sessionToken = crypto.randomBytes(32).toString('hex');
    let expirationTime = new Date(Date.now() + SESSION_DURATION);
    if (!userMatch) {
        const newUser = await createUser(req.body?.username);
        await createOrUpdateSession(newUser, sessionToken, expirationTime);
    }
    else {
        sessionToken = req?.isSessionExpired ? sessionToken : userMatch.session?.token as string
        expirationTime = req?.isSessionExpired ? expirationTime : userMatch.session?.expiresAt as Date
        await createOrUpdateSession(userMatch, sessionToken, expirationTime);
    }
    return res.status(200).json({ token: sessionToken });
}