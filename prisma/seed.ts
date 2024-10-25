// prisma/seed.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    // Create user types
    const pmoType = await prisma.userTypes.create({
        data: {
            name: 'PMO',
        },
    });

    const RecuiterType = await prisma.userTypes.create({
        data: {
            name: 'Recuiter',
        },
    });

    const adminType = await prisma.userTypes.create({
        data: {
            name: 'Admin',
        },
    });

    // Create users with relation to user types
    await prisma.user.create({
        data: {
            email: 'vipin@bawancybertek.com',
            username: 'vipinv',
            isAdmin: true,
            isActive: true,
            userTypeId: adminType.id,
            userDetails: {
                create: {
                    mobileNo: "9734324",
                    address: 'Bahwancybertek banglore office ',
                    organizationName: "Bct"
                },

            },
        },
    });


}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
