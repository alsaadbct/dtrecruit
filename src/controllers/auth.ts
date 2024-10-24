import { Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import { prisma } from '../utils/db';
import { authenticateWithAD, createOrUpdateSession, createUser, DUMMYADRESPONSE, getUserWithSessionsByEmail, getUserWithSessionsByInternalUserId, SESSION_DURATION } from '../utils/auth';
import crypto from 'crypto';

export const login = async (req: any, res: Response): Promise<Response> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            })
        }
        let userMatch;
        let internalUserData;
        if (!req.body?.email) {
            // const userData = await authenticateWithAD(req.username, req.password);
            internalUserData = DUMMYADRESPONSE;
            if (!internalUserData) {
                return res.status(401).json('Authentication failed');
            }
            userMatch = await getUserWithSessionsByInternalUserId(internalUserData.userId, true)
        }
        else {
            userMatch = await getUserWithSessionsByEmail(req.body?.email, true);
        }
        let sessionToken = crypto.randomBytes(32).toString('hex');
        let expirationTime = new Date(Date.now() + SESSION_DURATION);
        if (!userMatch) {
            const newUser = await createUser(req, internalUserData);
            await createOrUpdateSession(newUser, sessionToken, expirationTime);
        }
        else {
            await createOrUpdateSession(userMatch, sessionToken, expirationTime);
        }
        return res.status(200).json({ token: sessionToken });
    }
    catch (err) {
        console.error('Error at login', err);
        return res.status(500).json('Failed at login');
    }
}