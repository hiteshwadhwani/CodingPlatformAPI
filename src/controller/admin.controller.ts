import { NextFunction, Request, Response } from "express"
import {adminLoginService, adminSignUpService} from '../services/admin.service'

const adminLoginController = (req: Request, res: Response, next: NextFunction) => adminLoginService(req, res, next)
const adminSignUpController = (req: Request, res: Response, next: NextFunction) => adminSignUpService(req, res, next)

export {adminLoginController, adminSignUpController}