import { Router } from 'express';
import { verifyEmployee, registerEmployee, getAllMaintenanceRequests } from '../controllers/employees/employeeController';
import { verifyToken, requireRole } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.post('/login', verifyEmployee);
router.post('/register', registerEmployee);

// Protected routes - employee only
router.get('/maintenance-requests', verifyToken, requireRole(['employee']), getAllMaintenanceRequests);

export default router;
