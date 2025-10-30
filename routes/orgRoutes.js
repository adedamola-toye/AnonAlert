
import express from 'express';
const router =  express.Router()
import {register, login} from "../controller/authController.js"


router.post("/register", register)
router.post("/login", login)

//get all reports for tnat particular org
//update status
export default router