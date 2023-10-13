import { NextFunction, Request, Response } from "express";
import { decryptToken } from "../utils/commons/jwt";

export const startupAuthor = (req: Request | any, res: Response, next: NextFunction) => {
  const authorization = req.get("Authorization")
  const token = authorization?.split(" ")[1];
  if(!token) throw new Error("Missing tokens")
  const decryptInfo: any = decryptToken(token)
  if(decryptInfo.data.company_type == "STARTUPS") {
    req.userInfo = decryptInfo.data
    next()
  }else{
    throw new Error("Incorrect Token")
  }
}