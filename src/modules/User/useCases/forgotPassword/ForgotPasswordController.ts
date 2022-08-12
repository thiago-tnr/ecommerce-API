import { Request, Response } from "express";
import { ForgotPasswordService } from "./ForgotPasswordService";


export class ForgotPasswordController {

    constructor(private forgotPasswordService: ForgotPasswordService){}

    async handle(request: Request, response: Response){
        const userEmail = request.body.email

        if (!userEmail) {
            return response.status(400).json('Missing JSON args - email')
        }
    }
}