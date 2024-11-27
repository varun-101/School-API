import { Router } from 'express';
import { addSchool, listSchools } from '../controllers/schoolController.js';
import { validateSchool } from '../middleware/validation.js';

const router = Router();

router.post('/addSchool', validateSchool, addSchool);
router.get('/listSchools', listSchools);

export default router; 