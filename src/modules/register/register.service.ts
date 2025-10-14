import { prisma } from '../../lib/prisma';
import type { UserData } from "../../types/user-data";
import { ConflictError, ValidationError } from "../../utils/errors";
import bcrypt from 'bcryptjs';
import { stripNonDigits } from "../../utils/stripFormating";


export const RegisterService = async (data: UserData) => {

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

    const user = await prisma.user.create({
        data: {
            name,
            email,
            phoneNumber: rawPhoneNumber,
            password: hashedPassword,
        },
    });

    return user;
}