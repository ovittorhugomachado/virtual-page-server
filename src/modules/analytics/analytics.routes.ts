import { Router } from 'express';
import { recordPageView } from './analytics.controller';

const router = Router()

router.post('/analytics/pageview/:projectAnalyticsId', recordPageView)

export default router;