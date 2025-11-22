import { Router } from 'express';
import { getAllResidents, registerResident, verifyResident } from '../controllers/residents/residentController';
import { verifyToken, requireRole } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.post('/register', registerResident);
router.post('/login', verifyResident);

// Protected routes - require authentication
router.get('/all', verifyToken, requireRole(['resident', 'employee']), getAllResidents);

export default router;
