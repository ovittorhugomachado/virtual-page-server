import type { Request, Response } from 'express';
import { getUserDataService, updateEmailService, updateNameService, updateUserDataService } from './user.service';
import { handleControllerError } from '../../utils/errors';

export const getUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.userId;

    if (!userId) {
        res.status(200).json(null);
        return;
    }

    try {
        const user = await getUserDataService(userId);

        res.status(200).json(user);
        return;
    } catch (error: any) {
        handleControllerError(res, error);
    }
};

export const updateUserData = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const updateData = req.body;

    console.log("Dados recebidos no corpo da requisição:", updateData);

    try {
        if (!updateData || Object.keys(updateData).length === 0) {
            res.status(400).json({ message: 'O corpo da requisição está vazio.' });
            return;
        }

        if (!updateData.name && !updateData.email && !updateData.phoneNumber) {
            res.status(400).json({ message: 'Pelo menos um campo (name, email ou phoneNumber) deve ser fornecido.' });
            return;
        }

        const user = await updateUserDataService(Number(userId), updateData);

        res.status(200).json(user);
        return;
    } catch (error: any) {
        handleControllerError(res, error);
    }
}

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