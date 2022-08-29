import PasswordReset from "../../infra/models/PasswordReset";
import moment from "moment-timezone";
import bcrypt from "bcrypt"
import User from "../../infra/models/User";
import { isEmpty } from "../../../../helpers/empty/Empty";
import AppError from "../../../../helpers/appError/AppError";

interface Request{
    user: string; 
    resetString: string; 
    newPassword: string;
}

export class ResetPasswordService{
    async execute({user, resetString, newPassword}: Request){
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
                    throw new AppError('An error occurrer to send reset password', 400)
                }
                throw new AppError('The link to reset password expires', 400)
            }

            const compareHashedPassword = await bcrypt.compare(resetString, passwordString)

            if (!compareHashedPassword) {
                throw new AppError('Compare string fail, or the strings is not equal', 400)
            } else {
                const saltRounds  = parseInt(process.env.HASHED)

                const hashedPassword = await bcrypt.hash(newPassword, saltRounds)
                
                if (!hashedPassword) {
                    throw new AppError('An error occurred while hashing the new password', 400)
                }
                
                const userPasswordUpdated = await User.updateOne({_id: user}, {password: hashedPassword})
    
                if (userPasswordUpdated) {
                    const deleteChangePasswordSolicitation = await PasswordReset.deleteOne({_id: _id.toString()})
                    if (deleteChangePasswordSolicitation) {
                        return true;
                    } else {
                        throw new AppError('An error occurrer to delete the last requisition', 400)
                    }
                } else {
                    throw new AppError('An error occurred while save the new password', 400)
                }
            }
        } else {
            throw new AppError('An error occurrer to send reset password email', 400)
        }
    }
}