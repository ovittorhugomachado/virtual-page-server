import { prisma } from '../../lib/prisma';

export const recordNewVisitorService = async (visitorId: number, projectAnalyticsId: number) => {

    await prisma.$transaction(async (tx) => {
        const access = await tx.access.create({
            data: {
                visitorId,
                projectAnalyticsId,
            },
        });

        await tx.accessTime.create({
            data: {
                visitorId,
                accessDate: new Date(),
            },
        });

        return access.id; 
    });

};

export const recordNewAccessService = async (visitorId: number) => {

    await prisma.accessTime.create({
        data: {
            visitorId,
            accessDate: new Date()
        }
    });
};