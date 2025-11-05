import { prisma } from "../../lib/prisma";
import { NotFoundError, ValidationError } from "../../utils/errors";

export const sendNotificationService = async (data: {
    userId: number;
    tag: 'PROMOTION' | 'AWARD' | 'UPDATE' | 'ATTENTION'
    title: string;
    text: string;
}) => {
    const { userId, tag, title, text } = data;

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new NotFoundError("Usuário não encontrado");
    }

    const validTags = ["PROMOTION", "AWARD", "UPDATE", "ATTENTION"];
    if (!validTags.includes(tag)) {
        throw new ValidationError(`O tipo de notificação '${tag}' não é válido.`);
    }

    const notification = await prisma.notification.create({
        data: {
            userId,
            tag,
            title,
            text,
        },
    });

    return notification;
};