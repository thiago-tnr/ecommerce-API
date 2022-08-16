import { Request, Response } from "express";
import PasswordReset from "../../infra/models/PasswordReset";
import moment from "moment-timezone";
import bcrypt from "bcrypt"
import User from "../../infra/models/User";
import AppError from "../../../../helpers/error/AppError";
import { isEmpty } from "../../../../helpers/isEmpty/Empty";

export class ResetPasswordController{
    async handle(request: Request, response: Response) {
        const {user, resetString, newPassword} = request.body;

        const resetPassword = await PasswordReset.find({userId: user})

        if (!isEmpty(resetPassword)){
            const {expiresIn} = resetPassword[0];
            const {passwordString} =  resetPassword[0];
            const {_id} = resetPassword[0];
      
            let dateExpires = Date.parse(expiresIn.toString())
    
            let today = Date.now();
            let data = moment.tz(today, "America/Sao_Paulo");
            let dateNow = Date.parse(data.format())
    
            if (dateNow > dateExpires) {
                const resetPasswordExpires = await PasswordReset.deleteOne({userId: user})
    
                if(!resetPasswordExpires) {
                    return response.status(400).json({ message:'An error occurrer to send reset password'})   
                }
    
                return response.status(400).json({ message:'The link to reset password expires'})
            }
    
            const compareHashedPassword = await bcrypt.compare(resetString, passwordString)
            if (!compareHashedPassword) {
                return response.status(401).json({message: "Compare string fail, or the strings is not equal"})
            } else {
                const saltRounds = 10;
                const hashedPassword = bcrypt.hash(newPassword, saltRounds)
                
                if (!hashedPassword) {
                    return response.status(401).json({message: "An error occurred while hashing the new password"})
                }
                
                const userPasswordUpdated = await User.updateOne({_id: user}, {password: hashedPassword})
    
                if (!userPasswordUpdated) {
                    return response.status(401).json({message: "An error occurred while save the new password"})
                } else {
                    const deleteChangePasswordSolicitation = await PasswordReset.deleteOne({_id: _id.toString()})
                }
            }
        } else {
            return response.status(400).json({ message:'An error occurrer to send reset password email'}) 
        }

        return response.json(resetPassword)
    }
}