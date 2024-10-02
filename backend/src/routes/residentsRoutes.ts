import { Router } from 'express';
import { getAllResidents,registerResident,verifyResident } from '../controllers/residents/residentController';

const router = Router();

router.get('/getAllResidents', getAllResidents);
router.post('/registerResident', registerResident);
router.post('/verifyResident', verifyResident);

export default router;