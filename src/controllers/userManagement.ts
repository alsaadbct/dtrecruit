import { Request, Response } from 'express';
import { validationResult, check, body } from 'express-validator';
import { prisma } from '../utils/db';
import { authenticateWithAD, createOrUpdateSession, createUser, DUMMYADRESPONSE, getUserWithSessionsById, getUserWithSessionsByUsername, SESSION_DURATION } from '../utils/auth';
import get from 'lodash.get'

export const createUsers = async (req: any, res: Response): Promise<Response> => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            })
        }

        const { username, email, internalUserId, userTypeId, address = "", mobileNo = "", organizationName = "" } = req.body
        // console.log(username, email, userTypeId)
        //prechecking 
        const precheck = await prisma.user.count({
            where: { OR: [{ email: email }, { internalUserId }] }, select: {
                email: true,
                internalUserId: true
            }
        })
        if (get(precheck, 'email', 0) != 0 || get(precheck, "internalUserId", 0) != 0) {
            return res.status(500).json({ msg: "Email or internalUserId already exist" });

        }


        const response = await prisma.user.create({
            data: {
                userTypeId: userTypeId,
                internalUserId: internalUserId,
                email,
                username,
                isAdmin: false,
            }
        })

        const user_id = get(response, 'id', "")

        if (user_id == "") throw Error("Error on creating user")


        const responseForUserDetails = await prisma.userDetails.create({
            data: {
                userId: user_id,
                address,
                mobileNo,
                organizationName
            }
        })
        console.log("responseForUserDetails", responseForUserDetails)

        return res.status(200).json({ data: response });
    }
    catch (err) {
        console.error('Error at login', err);
        return res.status(500).json(err);
    }
}