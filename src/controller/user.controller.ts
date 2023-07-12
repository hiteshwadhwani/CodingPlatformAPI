import { Request, Response ,NextFunction } from "express";
import {userLoginService} from '../services/user.service'


const userLoginController = (req: Request, res: Response, next: NextFunction) => userLoginService(req, res, next)

export {userLoginController}