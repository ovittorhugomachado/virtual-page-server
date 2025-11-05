import { prisma } from "../../lib/prisma";
import { NotFoundError } from "../../utils/errors";

export const sendWelcomeNotification = (userId: number): void => {

    const user = userId;
    if (!user) {
        throw new NotFoundError('Usuário não encontrado');
    }

    const notification = prisma.notification.create({
        data: {
            userId: user,
            tag: 'AWARD',
            title: 'Bem vindo à Virtual Page',
            text: 'Esse é o início de uma grande jornada!.... ',
            read: false,
        }
    })
}