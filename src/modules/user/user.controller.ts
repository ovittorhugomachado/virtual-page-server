import type { Request, Response } from 'express';
import { updateEmailService, updateNameService } from './user.service';
import { handleControllerError } from '../../utils/errors';

export const updateEmail = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
        res.status(401).json({ message: 'Usuário não autenticado' });
        return;
    }

    if (!email) {
        res.status(400).json({ message: 'O campo "email" é obrigatório' });
        return;
    }

    try {
        await updateEmailService(userId, email);
        res.status(200).json({ message: 'E-mail atualizado com sucesso' });
    } catch (error: any) {
        handleControllerError(res, error);
    }
};

export const updateName = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
        res.status(401).json({ message: 'Usuário não autenticado' });
        return;
    }

    if (!name) {
        res.status(400).json({ message: 'O campo "name" é obrigatório' });
        return;
    }

    try {
        await updateNameService(userId, name);
        res.status(200).json({ message: 'Nome atualizado com sucesso' });
    } catch (error: any) {
        handleControllerError(res, error);
    }
};