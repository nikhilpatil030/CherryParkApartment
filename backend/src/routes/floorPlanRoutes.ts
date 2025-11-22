import { Router } from 'express';
import { getAllFloorPlans } from '../controllers/floorPlan/floorPlan';
import { optionalAuth } from '../middleware/auth.middleware';

const router = Router();

// Floor plans can be viewed by anyone (public), but we track who's viewing if authenticated
router.get('/all', optionalAuth, getAllFloorPlans);

export default router;
