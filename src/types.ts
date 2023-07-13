import { User } from "@prisma/client"
import { Request } from "express"

export interface customRequest extends Request{
    cookies : {token ?: string}
    token ?: string
    user ?: User
}

export interface SubmissionData {
    problemId: number,
    source: string;
    compilerId: number;
    compilerVersionId?: number;
    tests?: string;
  }
  
  export interface Submission {
    id: string;
    executing: boolean;
    data: any;
  }