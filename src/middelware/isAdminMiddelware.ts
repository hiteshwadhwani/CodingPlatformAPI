import { NextFunction, Request, Response } from "express";
import { customRequest } from "../types";

export const isAdmin = (req: customRequest, res: Response, next: NextFunction) => {
    const user = req.user && req.user.role === 'ADMIN'
    if(!user){
        return res.status(401).json({msg: 'Only Admin Allowed'})
    }

    next()
}