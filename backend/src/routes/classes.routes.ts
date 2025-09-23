import { Router } from 'express';
import ClassController from '../controllers/classes.controller';

const router = Router();

router.get('/classes', ClassController.getAllClasses);

export default router;