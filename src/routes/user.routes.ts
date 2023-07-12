import express, { Router } from 'express'
import {userLoginController} from '../controller/user.controller'

const router : Router = express.Router()

router.get('/login', userLoginController)

export default router