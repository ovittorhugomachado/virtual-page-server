import { Router } from 'express';
import { authenticateToken } from '../../middleware/authenticate-token.middleware';
import { getUser, updateEmail, updateName, updateUserData } from './user.controller';

const router = Router()

router.get('/user-data', authenticateToken, getUser)

router.patch('/update-user-data/:userId', authenticateToken, updateUserData);

router.patch('/update-email', authenticateToken, updateEmail);

router.patch('/update-name', authenticateToken, updateName);

export default router;