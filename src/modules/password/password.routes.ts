import { Router } from 'express';
import {
    requestPasswordReset,
    resetPassword,
    validateToken,
} from './password.controller';

const router = Router();

router.post('/recover-password', requestPasswordReset);

router.get('/validate-token/:token', validateToken);

router.patch('/create-new-password/:token', resetPassword);

export default router;