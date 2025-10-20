
import express from 'express';
const router =  express.Router()
import {submitReport, getReportStatus} from "../controller/reportController.js"
import upload from '../middleware/multer.js'

router.post("/submit", upload.any(), submitReport)
router.get("/status/:trackingId", getReportStatus)

export default router