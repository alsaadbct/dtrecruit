import { DEFAULT_PASSWORD } from "./constants";
import { prisma } from "./db";
import axios from "axios";

const SESSION_DURATION = 3600 * 1000; // 1 hour
const LOGIN_PATH = '/auth/login';

const createUser = async (req: any, userData: any) => {
    let res = await prisma.user.create({
        data: {
            internalUserId: userData?.userId,
            username: userData?.username,
            password: DEFAULT_PASSWORD,
            email: userData?.email,
            userTypeId: userData?.roleId,
        }
    })
    return res;
}

const createOrUpdateSession = async (user: any, token: string, expiresAt: Date) => {
    let deviceId = user.deviceId ?? user?.session?.deviceId ?? null;
    console.log(deviceId)
    const session = await prisma.session.upsert({
        where: {
            userId: user?.id ?? user?.session?.userId
        },
        create: {
            userId: user.id,
            deviceId,
            email: user?.email,
            username: user?.username,
            token,
            expiresAt
        },
        update: {
            token,
            expiresAt,
            deviceId
        },
        include: {
            user: true,
        }
    });
    return session;
};

const getUserByUsername = async (username: string, session: boolean, userDetails: boolean) => {
    return await prisma.user.findFirst({
        where: { username },
        include: { session }
    });
};

const getUserById = async (userId: string, session: boolean) => {
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
const getUserByInternalUserId = async (internalUserId: string, session: boolean, userDetails: boolean) => {
    return await prisma.user.findUnique({
        where: { internalUserId },
        include: { session, userDetails, }
    });
};

// for external user
const getUserByEmail = async (email: string, session: boolean, userDetails: boolean) => {
    return await prisma.user.findUnique({
        where: { email },
        include: { session, userDetails, }
    });
};


const getUserByEmailAndPassword = async (user: any, session: boolean, userDetails: boolean) => {
    return await prisma.user.findUnique({
        where: { email: user.email, password: user.password },
        include: { session, userDetails, }
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
    "roleId": 3,
    "roleName": "Employee",
    "pageSize": "5"
}


export {
    createUser,
    authenticateWithAD,
    createOrUpdateSession,
    getSessionBasedOnToken,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    getUserByInternalUserId,
    getUserByEmailAndPassword,
    LOGIN_PATH,
    DUMMYADRESPONSE,
    SESSION_DURATION,
}
