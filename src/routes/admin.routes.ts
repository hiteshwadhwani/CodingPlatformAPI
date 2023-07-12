import express from 'express'
import {adminLoginController, adminSignUpController} from '../controller/admin.controller'

const router = express.Router()

router.post('/login', adminLoginController)
router.post('/signup', adminSignUpController)

export default router