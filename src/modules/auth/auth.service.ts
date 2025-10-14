import { prisma } from '../../lib/prisma';
import type { UserData } from "../../types/user-data";
import { ConflictError, UnauthorizedError, ValidationError } from "../../utils/errors";
import bcrypt from 'bcryptjs';
import { stripNonDigits } from "../../utils/stripFormating";
import { confirmEmailTokenGenerator, generateTokensPassword } from './utils/token-generator';
import { emailConfirmationService } from '../../utils/email-sender';

export const registerService = async (data: UserData) => {

    const { name, email, phoneNumber, password } = data;

    const rawPhoneNumber = stripNonDigits(phoneNumber);

    if (!email.includes('@')) throw new ValidationError('Email inválido');
    if (password.length < 8) throw new ValidationError('Senha fraca');
    if (password.length > 72) throw new ValidationError('Senha muito longa');
    if (!/[A-Z]/.test(password)) throw new ValidationError('Senha sem letra maiúscula');
    if (!/[0-9]/.test(password)) throw new ValidationError('Senha sem número');

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) throw new ConflictError('Email já cadastrado');

    const hashedPassword = await bcrypt.hash(password, 10);

    const { activeEmailToken } = confirmEmailTokenGenerator({ email });

    const user = await prisma.user.create({
        data: {
            name,
            email,
            phoneNumber: rawPhoneNumber,
            password: hashedPassword,
            status: 'PENDING',
            tokenEmail: activeEmailToken,
        },
    });

    await emailConfirmationService(user.email, user.tokenEmail, user.name);

    return user;
}

export const confirmEmailService = async (tokenEmail: string) => {

    const user = await prisma.user.findUnique({ where: { tokenEmail } });

    if (!user) throw new ValidationError('Token inválido');
    if (user.status === 'ACTIVE') throw new ConflictError('Email já confirmado');
    
    return await prisma.user.update({
        where: { id: user.id },
        data: { status: 'ACTIVE' },
    })
}

export const loginService = async (data: UserData) => {

    const { email, password } = data

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
        throw new UnauthorizedError('Email ou senha inválidos');
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
        throw new UnauthorizedError('Email ou senha inválidos');
    }

    const payload = {
        userId: user.id,
    };

    const { accessToken, refreshAccessToken } = generateTokensPassword(payload);

    await prisma.user.update({
        where: { id: user.id },
        data: { refreshAccessToken },
    });

    return { accessToken, refreshAccessToken };

}

export const logoutService = async (userId: number) => {
    await prisma.user.update({
        where: { id: userId },
        data: { refreshAccessToken: null },
    });
};
