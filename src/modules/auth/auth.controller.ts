import type { Request, Response } from "express";
import { handleControllerError } from "../../utils/errors";
import { loginFieldsErrorChecker, signUpFieldsErrorChecker } from "./utils/field-error-checker";
import {
    confirmEmailService,
    deleteUserService,
    loginService,
    logoutService,
    refreshTokenService,
    registerService
} from "./auth.service";

export const register = async (req: Request, res: Response): Promise<void> => {

    try {

        const validationError = signUpFieldsErrorChecker(req.body);
        if (validationError) {
            res.status(422).json({ error: validationError });
            return
        }

        await registerService(req.body);

        res.status(201).json({ message: 'Usuário criado com sucesso' });
        return

    } catch (error: any) {

        handleControllerError(res, error);

    }
}

export const confirmEmail = async (req: Request, res: Response): Promise<void> => {

    try {
        const { token } = req.params;

        await confirmEmailService(String(token));

        res.status(201).json({ message: 'Email confirmado com sucesso' });
        return

    } catch (error: any) {

        handleControllerError(res, error);

    }
}

export const login = async (req: Request, res: Response): Promise<void> => {

    try {

        const validationError = loginFieldsErrorChecker(req.body);
        if (validationError) {
            res.status(400).json({ message: validationError });
            return
        }

        const { accessToken, refreshAccessToken } = await loginService(req.body);

        res.cookie('token', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
            maxAge: 24 * 60 * 60 * 1000, //1 DIA
        });

        res.cookie('refreshToken', refreshAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias
        });

        res.status(200).json({ message: 'Login realizado com sucesso' });
        return

    } catch (error: any) {

        handleControllerError(res, error);

    }
}

export const refreshAccessToken = async (req: Request, res: Response): Promise<void> => {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        res.status(401).json({ message: 'Refresh token não fornecido' });
        return
    }

    try {
        const newAccessToken = await refreshTokenService(refreshToken);

        res.cookie('token', newAccessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000, // 15 minutos
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dias
        });

        res.status(200).json({ message: 'Token renovado com sucesso' });
        return

    } catch (error: any) {

        handleControllerError(res, error);

    }
}

export const logout = async (req: Request & { user?: any }, res: Response): Promise<void> => {

    try {

        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ message: 'Usuário não autenticado' });
            return
        }

        await logoutService(userId);

        res.clearCookie('token');
        res.clearCookie('refreshToken');
        res.status(200).json({ message: 'Logout efetuado com sucesso' });
        return

    } catch (error) {

        handleControllerError(res, error);

    }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {

    const userId = Number(req.user?.userId);

    try {

        await deleteUserService(userId);

        res.status(200).json({ message: 'Usuário deletado com sucesso' });
        return

    } catch (error: any) {

        handleControllerError(res, error);

    }
};