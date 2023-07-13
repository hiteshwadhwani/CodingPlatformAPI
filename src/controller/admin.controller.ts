import { NextFunction, Request, Response } from "express"
import {adminLoginService, adminSignUpService, addQuestionService, updateQuestionService, deleteQuestionService, addTestCaseService} from '../services/admin.service'

const adminLoginController = (req: Request, res: Response, next: NextFunction) => adminLoginService(req, res, next)
const adminSignUpController = (req: Request, res: Response, next: NextFunction) => adminSignUpService(req, res, next)

const addQuestionController = (req: Request, res: Response, next: NextFunction) => addQuestionService(req, res, next)
const updateQuestionController = (req: Request, res: Response, next: NextFunction) => updateQuestionService(req, res, next)
const deleteQuestionController = (req: Request, res: Response, next: NextFunction) => deleteQuestionService(req, res, next)
const addTestCaseController = (req: Request, res: Response, next: NextFunction) => addTestCaseService(req, res, next)


export {adminLoginController, adminSignUpController, addQuestionController, updateQuestionController, deleteQuestionController, addTestCaseController}