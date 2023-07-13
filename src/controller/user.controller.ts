import { Request, Response ,NextFunction } from "express";
import {userLoginService, UserSignUpService, userCheckAnswerService} from '../services/user.service'

const userLoginController = (req: Request, res: Response, next: NextFunction) => userLoginService(req, res, next)
const userSignUpController = (req: Request, res: Response, next: NextFunction) => UserSignUpService(req, res, next)
const userCheckAnswerController = (req: Request, res: Response, next: NextFunction) => userCheckAnswerService(req, res, next)

export {userLoginController, userSignUpController, userCheckAnswerController}