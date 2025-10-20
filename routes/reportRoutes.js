
import express from 'express';
const router =  express.Router()
import {submitReport} from "../controller/reportController.js"
import upload from '../middleware/multer.js'

router.post("/submit", upload.any(), submitReport)


export default router