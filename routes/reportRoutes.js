
import express from 'express';
const router =  express.Router()
import {submitReport, getReportStatus} from "../controller/reportController.js"
import upload from '../middleware/multer.js'
import { getChatHistory, sendMessageByReporter } from '../controller/reporterController.js';
import { authAnonChatMiddleware } from '../middleware/authAnonChatMiddleware.js';

router.post("/submit", upload.any(), submitReport)
router.get("/status/:trackingId", getReportStatus)
router.get("/:trackingId/chat", getChatHistory)
router.post("/:trackingId/chat/send",authAnonChatMiddleware, sendMessageByReporter )
export default router;