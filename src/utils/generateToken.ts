import { User } from "@prisma/client"
import jwt, { Secret } from "jsonwebtoken"

export const generateToken = (user: User) => {
    const payload = {sub: user.id}
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY as Secret, {expiresIn : '1d'})
    return token
}