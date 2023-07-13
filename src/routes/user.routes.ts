import express, { NextFunction, Response , Router, Request } from 'express'
import {userLoginController, userSignUpController, userCheckAnswerController} from '../controller/user.controller'
import {isAuthenticated} from '../middelware/authMiddelware'
import axios from 'axios'
const router : Router = express.Router()

// /user/login
router.post('/login', userLoginController)

// /user/signup
router.post('/signup', userSignUpController)

// An API that takes the solution from the user for a particular question.

// /user/submission
router.post('/submission', isAuthenticated, userCheckAnswerController)
export default router