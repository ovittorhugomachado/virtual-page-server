import type { Request, Response } from "express";
import { signUpFieldsErrorChecker } from "./field-error-checker";
import { RegisterService } from "./register.service";
import { handleControllerError } from "../../utils/errors";

export const Register = async (req: Request, res: Response): Promise<void> => {

    try {

        const validationError = signUpFieldsErrorChecker(req.body);
        if (validationError) {
            res.status(422).json({ error: validationError });
            return
        }

        await RegisterService(req.body);

        res.status(201).json({ message: 'Usuário criado com sucesso' });
        return

    } catch (error: any) {

        handleControllerError(res, error);

    }
};