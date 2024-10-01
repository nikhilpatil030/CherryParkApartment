import { Router } from 'express';
import { getAllResidents,putResident,verifyResident } from '../controllers/residents/residentController';

const router = Router();

router.get('/getAllResidents', getAllResidents);
router.get('/putResident', putResident);
router.post('/verifyResident', verifyResident);

export default router;