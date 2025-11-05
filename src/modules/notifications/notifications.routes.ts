import { Router } from 'express';
import { sendNotification } from './notifications.controller';
import { authenticateToken } from '../../middleware/authenticate-token.middleware';

const router = Router();

router.post('/send-message/:userId', authenticateToken, sendNotification);

export default router;