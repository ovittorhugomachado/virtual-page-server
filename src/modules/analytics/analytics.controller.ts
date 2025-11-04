import type { Request, Response } from 'express';
import { recordNewAccessService, recordNewVisitorService } from './analytics.service';

export const recordPageView = async (req: Request, res: Response): Promise<void> => {
    try {
        const projectAnalyticsId = Number(req.params.projectAnalyticsId);
        let visitorPageId = req.cookies.visitorPageId;

        if (!visitorPageId) {
            visitorPageId = Math.floor(Math.random() * 1000000).toString();

            res.cookie('visitorPageId', visitorPageId, {
                httpOnly: true,
                maxAge: 365 * 24 * 60 * 60 * 1000,
            });

            await recordNewVisitorService(visitorPageId, projectAnalyticsId);
            res.status(201).json({ message: 'Visualização registrada com sucesso' });

        } else {
            await recordNewAccessService(visitorPageId);
            res.status(201).json({ message: 'Visualização registrada com sucesso' });
        }




    } catch (error) {
        console.error('Erro ao registrar visualização:', error);
        res.status(500).json({ message: 'Erro ao registrar visualização' });
    }
};
