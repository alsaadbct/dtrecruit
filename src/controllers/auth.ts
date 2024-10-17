import { Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import { prisma } from '../utils/db';

export const login = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        })
    }

    const userMatch = await prisma.user.findUnique({
        where: {
            userName: req.body?.username,
        }
    })
    console.log(userMatch)
    if (!userMatch) {
        const newUser = await prisma.user.create({
            data: {
                userName: req.body?.username as string,
            }
        })
    }

    return res.status(200).json("API Success");
}