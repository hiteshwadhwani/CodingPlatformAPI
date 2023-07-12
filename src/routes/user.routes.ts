import express, { NextFunction, Response , Router, Request } from 'express'
import {userLoginController, userSignUpController} from '../controller/user.controller'
import {customRequest} from "../types"
import { isAdmin } from '../middelware/isAdminMiddelware'

import {isAuthenticated} from '../middelware/authMiddelware'
const router : Router = express.Router()

router.post('/login', userLoginController)
router.post('/signup', userSignUpController)
router.get('/test', isAuthenticated, isAdmin, (req: customRequest, res: Response, next: NextFunction) => {
    const user = req.user

    if(!user){
        return res.status(400).json({msg: 'nice'})
    }
    res.status(200).json({user: user})
})

export default router