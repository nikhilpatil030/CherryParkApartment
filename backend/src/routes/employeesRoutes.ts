import { Router } from 'express';
import { verifyEmployee } from '../controllers/employees/employeeController';

const router = Router();

router.post('/verifyEmployee', verifyEmployee);

export default router;
