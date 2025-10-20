
import express from 'express';
const router =  express.Router()
import {createReport} from "../controller/reportController.js"
import upload from '../middleware/multer.js'

router.post("/submit", upload.any(), createReport)


export default router