import { Router } from 'express';
import { verifyEmployee,getAllMaintenanceRequests } from '../controllers/employees/employeeController';

const router = Router();

router.post('/verifyEmployee', verifyEmployee);
router.get('/getAllMaintenanceRequests', getAllMaintenanceRequests);

export default router;
