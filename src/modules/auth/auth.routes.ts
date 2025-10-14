import { Router } from 'express';
import { confirmEmail, register } from './auth.controller';

const router = Router()

//CRIAR UM REGISTRO NA TABELA USER E ENVIAR EMAIL DE CONFIRMAÇÃO
router.post('/register', register)

//ATUALIZA O VALOR DA COLUNA STATUS USER
//1°- PEGA O VALOR DO TOKEN NA URL
//2°- PROCURA O USUÁRIO COM ESSE TOKEN
//3°- SE ACHAR, ATUALIZA O STATUS PARA TRUE
router.patch('/confirm-email/:token', confirmEmail)

export default router;