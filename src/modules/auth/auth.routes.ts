import { Router } from 'express';
import { authLimiter } from './utils/auth-limiter';
import { authenticateToken } from '../../middleware/authenticate-token.middleware';
import {
    confirmEmail,
    deleteUser,
    login,
    logout,
    refreshAccessTokenVirtualPage,
    register,
    resendConfirmationEmail,
    validateEmailAvailability
} from './auth.controller';

const router = Router()

//CRIAR UM REGISTRO NA TABELA USER E ENVIAR EMAIL DE CONFIRMAÇÃO
router.post('/register', register)

//VALIDAR DISPONIBILIDADE DO EMAIL QUANDO CRIA A CONTA OU ALTERA O EMAIL
router.get('/validate-email/:email', validateEmailAvailability)

//ATUALIZA O VALOR DA COLUNA STATUS USER
//1°- PEGA O VALOR DO TOKEN NA URL
//2°- PROCURA O USUÁRIO COM ESSE TOKEN
//3°- SE ACHAR, ATUALIZA O STATUS PARA TRUE
router.patch('/confirm-email/:token', confirmEmail)

//ENVIA EMAIL DE CONFIRMAÇÃO
router.patch('/send-email-confirmation', resendConfirmationEmail)

router.post('/login', authLimiter, login);

router.post('/refresh-token', refreshAccessTokenVirtualPage);

router.post('/logout', authenticateToken, logout);

router.delete('/delete-user', authenticateToken, deleteUser);

export default router;