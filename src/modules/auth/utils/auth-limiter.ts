import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 90, //EM PRODUÇÃO ALTERAR PARA 20
    handler: (_, res) => {
        return res.status(429).json({
            message: 'Muitas tentativas, tente novamente em 15 minutos.',
        });
    }
});