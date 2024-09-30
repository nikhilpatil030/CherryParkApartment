import { Router } from 'express';
import { getAllFloorPlans} from '../controllers/floorPlan/floorPlan';

const router = Router();

router.get('/getAllFloorPlans', getAllFloorPlans);

export default router;