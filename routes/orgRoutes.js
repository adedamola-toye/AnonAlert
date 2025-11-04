
import express from 'express';
const router =  express.Router()
import { updateStatusController, getAllForwardedReports, getSingleForwardedReport } from '../controller/organizationController.js';
import { authMiddleware } from '../middleware/authOrgMiddleware.js';


router.patch("/reports/:reportId", authMiddleware, updateStatusController)
router.get("/reports",authMiddleware, getAllForwardedReports)
router.get("/reports/:reportId", authMiddleware, getSingleForwardedReport)

export default router