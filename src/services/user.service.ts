import { Request, Response,NextFunction } from "express";

const userLoginService = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({message: 'nice'})
}

export {userLoginService}