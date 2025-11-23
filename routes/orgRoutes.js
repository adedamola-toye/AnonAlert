
import express from 'express';
const router =  express.Router()
import { updateStatusController, getAllForwardedReports, getSingleForwardedReport, getAllReportsByReducingCredibilityScore , sendMessage, getChatHistory} from '../controller/organizationController.js';
import { authMiddleware } from '../middleware/authOrgMiddleware.js';


router.patch("/reports/:reportId", authMiddleware, updateStatusController)
router.get("/reports",authMiddleware, getAllForwardedReports)
router.get("/reports/:reportId", authMiddleware, getSingleForwardedReport)
router.get("/reports/credibility-ranking", authMiddleware, getAllReportsByReducingCredibilityScore)

//Chatting
router.post("/reports/:reportId/chat", authMiddleware, sendMessage)
router.get("/reports/:reportId/chat", authMiddleware, getChatHistory)
export default router