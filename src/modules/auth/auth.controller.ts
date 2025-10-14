import type { Request, Response } from "express";
import { signUpFieldsErrorChecker } from "./field-error-checker";
import { confirmEmailService, registerService } from "./auth.service";
import { handleControllerError } from "../../utils/errors";

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
};

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