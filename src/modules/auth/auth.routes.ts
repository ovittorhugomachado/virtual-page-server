import { Router } from 'express';
import { confirmEmail, login, logout, register } from './auth.controller';
import { authLimiter } from './utils/auth-limiter';
import { authenticateToken } from '../../middleware/authenticate-token.middleware';

const router = Router()

//CRIAR UM REGISTRO NA TABELA USER E ENVIAR EMAIL DE CONFIRMAÇÃO
router.post('/register', register)

//ATUALIZA O VALOR DA COLUNA STATUS USER
//1°- PEGA O VALOR DO TOKEN NA URL
//2°- PROCURA O USUÁRIO COM ESSE TOKEN
//3°- SE ACHAR, ATUALIZA O STATUS PARA TRUE
router.patch('/confirm-email/:token', confirmEmail)

router.post('/login', authLimiter, login);

router.post('/logout', authenticateToken, logout);

export default router;