import { Request, Response } from "express";
import LoginUserService from "./LoginUserService";
import jwt from 'jsonwebtoken'
export class LoginUserController {

    constructor(private loginUserService: LoginUserService){}

    async handle(request: Request, response: Response) {
        const {email, password: inputPassword} = request.body;
        const user = await this.loginUserService.execute({email, inputPassword})

        const token = jwt.sign({
            id: user.id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SEC,
        {expiresIn: "1h"})

        const refreshToken = jwt.sign({
            id: user.id,
        }, process.env.REFRESH_JWT_SEC,
        {expiresIn: "12h"})

        //@ts-ignore //._doc is a mongoDb return
        const { password, ...others } = user._doc; 
        return response.status(200).json({...others, token, refreshToken}); 
    }
}