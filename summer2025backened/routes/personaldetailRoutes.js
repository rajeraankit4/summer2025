import express from 'express';
import { personaldetailInsert, personaldetailList } from '../controllers/personaldetailController.js';

const router = express.Router();

// POST request to insert personal detail
router.post('/insert', personaldetailInsert);
router.get('/view', personaldetailList);
// Export the router
export default router;