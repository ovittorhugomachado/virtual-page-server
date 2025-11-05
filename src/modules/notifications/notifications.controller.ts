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