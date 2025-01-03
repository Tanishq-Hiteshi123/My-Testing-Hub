import { NextFunction, Request, Response } from "express";
import response from "../helpers/response";
import jwt, { JwtPayload } from 'jsonwebtoken'

export interface JWTPayload extends JwtPayload {
  userId: string;
  userRole: string;
}
export const isAuthenticated = async (req : Request , res : Response , next : NextFunction) =>{
  
    try {
       const token = req.headers["authorization"]?.split(" ")[1];

       if (!token) {
          return response.error ({
              res,
              error : true,
              code : 401,
              data : null,
              message : "UnAuthorised Access Denied"
          })
       }

       const decoded = jwt.verify(token , process.env.JWT_SECRET!);
       
       req.user  = decoded as JWTPayload;

       next()
    }
    catch (error) {
       
            return response.error({
              res,
              code : 500,
              data : null,
              error : true,
              message : error instanceof Error ? error.message : "Internal Server Error"
            })
    }

}