
import express from 'express';
const router =  express.Router()
import { updateStatusController, getForwardedReports } from '../controller/organizationController.js';
import { authMiddleware } from '../middleware/authOrgMiddleware.js';


router.put("/reports/:reportId", authMiddleware, updateStatusController)
router.get("/reports",authMiddleware, getForwardedReports)

//get all reports for tnat particular org
//update status
export default router