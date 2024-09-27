import { Router } from 'express';
import { getAllResidents,putResident } from '../controllers/residents/residentController';

const router = Router();

router.get('/getAllResidents', getAllResidents);
router.get('/putResident', putResident);

export default router;