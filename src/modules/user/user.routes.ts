import { Router } from 'express';
import { authenticateToken } from '../../middleware/authenticate-token.middleware';
import { updateEmail, updateName } from './user.controller';

const router = Router()

router.patch('/update-email', authenticateToken, updateEmail);
router.patch('/update-name', authenticateToken, updateName);

export default router;