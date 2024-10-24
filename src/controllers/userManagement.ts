import { Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import { prisma } from '../utils/db';
import { authenticateWithAD, createOrUpdateSession, createUser, DUMMYADRESPONSE, getUserWithSessionsById, getUserWithSessionsByUsername, SESSION_DURATION } from '../utils/auth';
import crypto from 'crypto';

export const createUsers = async (req: any, res: Response): Promise<Response> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            })
        }


        return res.status(200).json({ data: 12 });
    }
    catch (err) {
        console.error('Error at login', err);
        return res.status(500).json('Failed at login');
    }
}