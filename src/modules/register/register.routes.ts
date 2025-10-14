import { Router } from 'express';
import { Register } from './register.controller';

const router = Router()


router.post('/register', Register)

export default router;