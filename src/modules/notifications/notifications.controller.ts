import type { Request, Response } from "express";
import { sendNotificationService } from "./notifications.service";
import { handleControllerError } from "../../utils/errors";

export const sendNotification = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, tag, title, text } = req.body;

        if (!userId || !tag || !title || !text) {
            res.status(400).json({ error: "Os campos userId, tag, title e text são obrigatórios." });
            return;
        }

        const parsedUserId = Number(userId);
        if (isNaN(parsedUserId)) {
            res.status(400).json({ error: "O campo userId deve ser um número válido." });
            return;
        }

        const notification = await sendNotificationService({
            userId: parsedUserId,
            tag,
            title,
            text,
        });

        res.status(201).json({ message: "Notificação enviada com sucesso", notification });
        return;
    } catch (error: any) {
        handleControllerError(res, error);
    }
};