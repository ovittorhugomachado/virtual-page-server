import bcrypt from 'bcryptjs';
import { prisma } from '../../lib/prisma';
import { randomUUID } from 'crypto';
//import { transporter } from '../../utils/email';
import { NotFoundError, ValidationError } from '../../utils/errors';
import { emailResetPasswordSender } from '../../utils/email-sender';

export const generateResetTokenService = async (email: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundError('Usuário não encontrado');

    await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });

    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 3600000); // 1h

    await prisma.passwordResetToken.create({
        data: {
            token,
            userId: user.id,
            expiresAt,
            createdAt: new Date(Date.now())
        }
    });

    emailResetPasswordSender(user.email, token, user.name) 

    return { token, userId: user.id };
};

export const validateTokenService = async (token: string) => {

    const tokenData = await prisma.passwordResetToken.findFirst({ where: { token } });
    if (!tokenData || tokenData.expiresAt < new Date()) throw new NotFoundError('Token inválido');
};

export const resetPasswordService = async (token: string, newPassword: string) => {
    const tokenRecord = await prisma.passwordResetToken.findUnique({
        where: { token },
        include: { user: true }
    });

    if (newPassword.length < 8) throw new ValidationError('Senha fraca');
    if (newPassword.length > 72) throw new ValidationError('Senha muito longa');
    if (!/[A-Z]/.test(newPassword)) throw new ValidationError('Senha sem letra maiúscula');
    if (!/[0-9]/.test(newPassword)) throw new ValidationError('Senha sem número');

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) throw new NotFoundError('Token inválido ou expirado');
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
        where: { id: tokenRecord.userId },
        data: { password: hashedPassword }
    });

    await prisma.passwordResetToken.delete({ where: { token } });
};





