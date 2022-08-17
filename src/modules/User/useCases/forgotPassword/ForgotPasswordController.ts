import { Request, Response } from "express";
import AppError from "../../../../helpers/error/AppError";
import { ForgotPasswordService } from "./ForgotPasswordService";
;export class ForgotPasswordController {

    constructor(private forgotPasswordService: ForgotPasswordService){}

    async handle(request: Request, response: Response){
        const {email, redirectUrl} = request.body

        if (!email) {
            throw new AppError('Missing JSON args - email', 400)
        }

       const forgotPasswordSendEmail = await this.forgotPasswordService.execute({email, redirectUrl})

       if (forgotPasswordSendEmail) {
        return response.json({message: "Password reset email sent", status: 'PENDING'})
       }
    }
}