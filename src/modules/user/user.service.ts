import { prisma } from '../../lib/prisma';
import { emailChangeConfirmationService } from '../../utils/email-sender';
import { ConflictError, NotFoundError } from '../../utils/errors';
import { confirmEmailTokenGenerator } from '../auth/utils/token-generator';

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

    await emailChangeConfirmationService(user.email, user.tokenEmail, user.name);

    if (!user) {
        throw new NotFoundError('Usuário não encontrado');
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