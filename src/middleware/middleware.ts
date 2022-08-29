import { NextFunction, Request, Response } from "express"
import Jwt from "jsonwebtoken";
import AppError from "../helpers/appError/AppError";

export const refreshToken = (req: Request, res: Response, next: NextFunction) =>{
  const refreshToken: any = req.body.refreshToken;
  if (refreshToken) {
      Jwt.verify(refreshToken, process.env.REFRESH_JWT_SEC as string, (err: any, user: any) => {
          if (err) {
            throw new AppError('Invalid Token', 403)
          } else { 
              const tokenRefreshed = Jwt.sign({name: user.name}, process.env.JWT_SEC, {expiresIn: '60s'})
              return res.status(200).json({message : "Token refreshed sucessfuly", tokenRefreshed });
          }
      })
  } else {
    throw new AppError('You are not authenticated', 401)
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) =>{
    const authHeader: any = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        Jwt.verify(token, process.env.JWT_SEC as string, (err: any, user: any) => {
            if (err) {
                res.status(403).json("Invalid Token");
            } else { 
                req.user = user;
                next();
            }
        })
    } else {
      throw new AppError("You are not authenticated", 401);
    }
}

export const verifyTokenAndAuthorization = (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        throw new AppError("You are not alowed to do that!", 403);
      }
    });
  };

export const verifyTokenAndAdmin = (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        throw new AppError("Only admins alowed to do that!", 403);
      }
    });
  };