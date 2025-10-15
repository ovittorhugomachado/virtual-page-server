import type { Request, Response } from "express";
import { handleControllerError } from '../../utils/errors';
import {
    generateResetTokenService,
    resetPasswordService,
    validateTokenService,
} from './password.service';

export const requestPasswordReset = async (req: Request, res: Response): Promise<void> => {

    const { email } = req.body;

    try {

        await generateResetTokenService(email);

        res.status(200).json({ message: 'Um link de redefinição de senha foi enviado para seu email' });
        return

    } catch (error: any) {

        handleControllerError(res, error);

    }
};

export const validateToken = async (req: Request, res: Response): Promise<void> => {

    const { token } = req.params;

    if (!token) {
        res.status(400).json({ message: 'Token não fornecido' });
        return;
    }

    try {

        await validateTokenService(token);

        res.status(200).json({ message: 'Token válido' });
        return

    } catch (error: any) {

        handleControllerError(res, error);

    }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {

    const { newPassword } = req.body;
    const { token } = req.params;


    if (!token) {
        res.status(400).json({ message: 'Token não fornecido' });
        return;
    }

    try {

        await resetPasswordService(token, newPassword);

        res.status(200).json({ message: 'Senha redefinida com sucesso' });
        return

    } catch (error: any) {

        handleControllerError(res, error);

    }
};


