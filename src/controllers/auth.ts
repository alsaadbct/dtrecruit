import { Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import { authenticateWithAD, createOrUpdateSession, createUser, DUMMYADRESPONSE, getUserByEmail, getUserByEmailAndPassword, getUserByInternalUserId, SESSION_DURATION } from '../utils/auth';
import crypto from 'crypto';
import { sendError, sendResponse } from '../utils/helper';

export const login = async (req: any, res: Response): Promise<Response> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return sendError(res, 400, 'Form Invalid.', errors.array());
        }
        let userMatch;
        let internalUserData;
        let isExternalUser = false;
        if (!req.body?.email) {
            /* this code will not be used because there is no difference in login as of now 
            below code was to register a new internal user , since the admin is adding those user login controller need not required to do it.
            */
            // const userData = await authenticateWithAD(req.username, req.password);
            internalUserData = DUMMYADRESPONSE;
            if (!internalUserData) {
                return sendError(res, 401, 'Authentication failed.');
            }
            userMatch = await getUserByInternalUserId(internalUserData.userId, true, true)
        }
        else {
            //external & all users who is already added by admin
            //isExternalUser = true;
            userMatch = await getUserByEmailAndPassword(req?.body, true, true);
            if (userMatch?.session) {
                userMatch.session.deviceId = req?.body?.deviceId
            }
        }
        let sessionToken = crypto.randomBytes(32).toString('hex');
        let expirationTime = new Date(Date.now() + SESSION_DURATION);
        if (!userMatch) {
            // if (isExternalUser) {
            //     return sendError(res, 401, 'Invalid username or password.');
            // }
            // const newUser = await createUser(req, internalUserData);
            // let newUserData = {
            //     ...newUser,
            //     deviceId: internalUserData?.deviceId,
            // }
            // userMatch = await createOrUpdateSession(newUserData, sessionToken, expirationTime);
            return sendError(res, 401, 'Authentication failed, Please check verify credentials', 'For more info contact Admin.');
        }
        else {
            await createOrUpdateSession(userMatch, sessionToken, expirationTime);
        }
        return sendResponse(res, 200, userMatch)
    }
    catch (err) {
        console.error('Error at login', err);
        return sendError(res, 500, 'Failed at login')
    }
}