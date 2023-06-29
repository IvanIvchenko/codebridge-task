import { Router } from 'express';

import { dogRouter } from './dog.router';

const router = Router();

router.use('/', dogRouter);

export { router as routes };
