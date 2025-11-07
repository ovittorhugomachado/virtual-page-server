import { prisma } from '../../lib/prisma';
import { emailChangeConfirmationSender } from '../../utils/email-sender';
import { ConflictError, NotFoundError } from '../../utils/errors';
import { confirmEmailTokenGenerator } from '../auth/utils/token-generator';

export const getUserDataService = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            phoneNumber: true,
            email: true,
            status: true,
            projects: {
                select: {
                    name: true,
                    type: true,
                    status: true,
                    alert: true,
                    preferences: true,
                    created_at: true,
                    updated_at: true,
                }
            }
        }
    });

    if (!user) {
        throw new NotFoundError('Usuário não encontrado');
    }

    return user;
}

export const updateEmailService = async (userId: number, email: string) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
        throw new ConflictError('Este e-mail já está em uso');
    }

    const { activeEmailToken } = confirmEmailTokenGenerator({ email });

    const user = await prisma.user.update({
        where: { id: userId },
        data: {
            email,
            status: 'PENDING',
            tokenEmail: activeEmailToken
        },
    });

    await emailChangeConfirmationSender(user.email, user.tokenEmail, user.name);

    if (!user) {
        throw new NotFoundError('Usuário não encontrado');
    }

    return user;
};

export const updateUserDataService = async (
    userId: number,
    data: { name?: string; email?: string; phoneNumber?: string }
) => {

    const updateData: any = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.phoneNumber !== undefined) updateData.phoneNumber = data.phoneNumber;

    if (data.email) {
        const { activeEmailToken } = confirmEmailTokenGenerator({ email: data.email });
        updateData.email = data.email;
        updateData.status = 'PENDING';
        updateData.tokenEmail = activeEmailToken;
    }

    if (Object.keys(updateData).length === 0) {
        throw new Error('Nenhum dado válido foi fornecido para atualização.');
    }

    const user = await prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: { name: true, email: true, phoneNumber: true, tokenEmail: true },
    });

    if (data.email) {
        await emailChangeConfirmationSender(user.email, user.tokenEmail, user.name);
    }

    return user;
};

export const updateNameService = async (userId: number, name: string) => {
    const user = await prisma.user.update({
        where: { id: userId },
        data: { name },
    });

    if (!user) {
        throw new NotFoundError('Usuário não encontrado');
    }

    return user;
};