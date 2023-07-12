import Prisma from "../libs/prisma"
import { NextFunction, Request, Response } from "express";
import jwt, { Secret, VerifyErrors } from 'jsonwebtoken'
import {customRequest} from "../types"

export const isAuthenticated = async (req: customRequest, res: Response, next: NextFunction) => {
    const authHeader = req && req.headers.authorization
    const token = (authHeader && String(authHeader).split(' ')[1]) || req.cookies.token || ''
    req.token = token

    if(!token){
        return res.status(401).json({msg: 'Unauthorized'})
    }

    try{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY as Secret, async (err: VerifyErrors, decodedUser: any) => {
            if(err){
                return res.status(401).json({msg: 'Unauthorized', description: err.message})
            }

            try{
                const decodedUserInDB = await Prisma.user.findUnique({
                    where : {
                        id: decodedUser.sub as string
                    }
                })

                if(!decodedUserInDB){
                    return res.status(401).json({message:"Unauthorized"})
                }

                req.user = decodedUserInDB
                next()

            }
            catch(error){
                return res.status(401).json({message:"Unauthorized"})
            }

        })

    }
    catch(error){
        res.status(500).json({msg: 'internal server error'})
    }
    

}