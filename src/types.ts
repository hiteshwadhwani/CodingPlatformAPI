import { User } from "@prisma/client"
import { Request } from "express"

export interface customRequest extends Request{
    cookies : {token ?: string}
    token ?: string
    user ?: User
}