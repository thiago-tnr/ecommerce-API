import { NextFunction, Request, request, Response } from "express"
import Jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();
/**
 * [] implementar o refresh token
 */

// export const middlewareAuth = {
//     private: (req: Request, res: Response, next: NextFunction) => {
//         let sucess = false;
//         if (req.headers.authorization) {
//             const [authJwt, token] = req.headers.authorization.split('')
//             try {
//                 if(authJwt === "Bearer"){
//                     Jwt.verify(
//                         token, 
//                         process.env.JWT_SECRET_KEY as string,
//                     );
//                 }
//                 sucess = true;
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         if(sucess){
//             next();
//         }else{
//             res.status(401).json("Unauthorized");
//         }
//     }
// }

export const refreshToken = (req: Request, res: Response, next: NextFunction) =>{
  const refreshToken: any = req.body.refreshToken;
  if (refreshToken) {
      Jwt.verify(refreshToken, process.env.REFRESH_JWT_SEC as string, (err: any, user: any) => {
          if (err) {
              res.status(403).json("Invalid Token");
          } else { 
              const tokenRefreshed = Jwt.sign({name: user.name}, process.env.JWT_SEC, {expiresIn: '60s'})
              return res.status(200).json({message : "Token refreshed sucessfuly", tokenRefreshed });
          }
      })
  } else {
      return res.status(401).json("You are not authenticated");
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
        return res.status(401).json("You are not authenticated");
    }
}

export const verifyTokenAndAuthorization = (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };

export const verifyTokenAndAdmin = (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("Only admins alowed to do that!");
      }
    });
  };