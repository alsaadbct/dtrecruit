import { PrismaClient } from '@prisma/client';

// defining global variable with types
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: ['query'],  // to log when we query db
    })
