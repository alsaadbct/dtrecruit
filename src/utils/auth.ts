import { prisma } from "./db";

const SESSION_DURATION = 3600 * 1000; // 1 hour
const LOGIN_PATH = '/auth/login';

const createUser = async (username: string) => {
    const res = await prisma.user.create({
        data: {
            username,
        }
    })
    return res;
}

const createOrUpdateSession = async (user: any, token: string, expiresAt: Date) => {
    await prisma.session.upsert({
        where: {
            userId: user?.id ?? user?.session?.userId
        },
        create: {
            userId: user.id,
            token,
            expiresAt
        },
        update: {
            token,
            expiresAt
        }
    });
};

const getUserWithSessionsByUsername = async (username: string, session: boolean) => {
    return await prisma.user.findUnique({
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
export {
    createUser,
    createOrUpdateSession,
    getSessionBasedOnToken,
    getUserWithSessionsById,
    getUserWithSessionsByUsername,
    LOGIN_PATH,
    SESSION_DURATION,
}
