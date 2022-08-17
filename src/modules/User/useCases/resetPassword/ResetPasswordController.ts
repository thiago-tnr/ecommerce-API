import { Request, Response } from "express";
import { ResetPasswordService } from "./ResetPasswordService";

//verfiy if password is equal the last
export class ResetPasswordController{
    constructor(private resetPasswordService: ResetPasswordService){}
    async handle(request: Request, response: Response) {
        const {user, resetString, newPassword} = request.body;

        const passwordReseted = await this.resetPasswordService.execute({user, resetString, newPassword})
        
        if (passwordReseted){
            return response.status(200).json({ message:'Passqord has been reset successfully '}) 
        }
    }
}