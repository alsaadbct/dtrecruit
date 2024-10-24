import { prisma } from "./db";
import axios from "axios";

const SESSION_DURATION = 3600 * 1000; // 1 hour
const LOGIN_PATH = '/auth/login';


const createUser = async (userData: any) => {
    // const res = await prisma.user.create({
    //         internalUserId: userData.userId,
    //         username: userData.username,
    //         email: userData.email,
    //         userTypeId: userData.roleId,
    //         isAdmin:  userData.isAdmin,
    //         isActive : true,
    //         userType : 1,
    //         userDetails



    // })
    // return res;
}

const createOrUpdateSession = async (user: any, token: string, expiresAt: Date) => {
    // await prisma.session.upsert({
    //     where: {
    //         userId: user?.id ?? user?.session?.userId
    //     },
    //     create: {
    //         userId: user.id,
    //         deviceId: user?.deviceId,
    //         email: user?.email,
    //         username: user?.username,
    //         token,
    //         expiresAt
    //     },
    //     update: {
    //         token,
    //         expiresAt
    //     }
    // });
};

const getUserWithSessionsByUsername = async (username: string, session: boolean) => {
    return await prisma.user.findFirst({
        where: { username },
        include: { session }
    });
};

const getUserWithSessionsById = async (userId: string, session: boolean) => {
    return await prisma.user.findUnique({
        where: { id: userId },
        include: { session }
    });
};

const getSessionBasedOnToken = async (token: string) => {
    return await prisma.session.findUnique({
        where: {
            token
        }
    });
};

const authenticateWithAD = async (username: string, password: string) => {
    const response = await axios.post(process.env.AD_URL as string, {
        username,
        password
    });
    if (response.status === 200) {
        console.log(response.data);
        return response.data;
    }
}

// for internal user
const getUserWithSessionsByInternalUserId = async (internalUserId: string, session: boolean) => {
    return await prisma.user.findUnique({
        where: { internalUserId },
        include: { session }
    });
};

// for external user
const getUserWithSessionsByEmail = async (email: string, session: boolean) => {
    return await prisma.user.findUnique({
        where: { email },
        include: { session }
    });
};


const DUMMYADRESPONSE = {
    "userId": "114082",
    "password": "798b26d7e49c05a63fe975e691411c08e529b5b1705b14391704d2d3ddfe3c91",
    "sessionId": "721A469D927F849992E134D45E5F15E8",
    "loginName": "114082",
    "username": "114082",
    "email": "anjali.c@bahwancybertek.com",
    "langId": "1",
    "employeeNo": "114082",
    "deviceId": "dOgTnuA22UM:APA91bFAweYUekWnwiK8YRiN_1EcCP46APle_-WnM_5FEn1MtEzG1nFapax9OCA2Zk8eY0MlANVyuZrvGUsxw1AzA8pWIODarUHvp5YYDhcIU9JCqXA2mOrXrXHUDUUgs_vK-QsfUw4X",
    "roleId": "0",
    "roleName": "Employee",
    "pageSize": "5"
}


export {
    createUser,
    authenticateWithAD,
    createOrUpdateSession,
    getSessionBasedOnToken,
    getUserWithSessionsById,
    getUserWithSessionsByEmail,
    getUserWithSessionsByUsername,
    getUserWithSessionsByInternalUserId,
    LOGIN_PATH,
    DUMMYADRESPONSE,
    SESSION_DURATION,
}
