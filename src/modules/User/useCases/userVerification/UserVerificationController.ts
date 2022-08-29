import { Request, Response } from "express";
import UserVerification from "../../infra/models/UserVerification";
import moment from "moment-timezone";
import User from "../../infra/models/User";
import bcrypt from "bcrypt"
import path from 'path';
import { isEmpty } from "../../../../helpers/empty/Empty";

export class UserVerificationController{
    async handle(request: Request, response: Response ){
        const {userId, uniqueString} = request.params;

        const userVerification = await UserVerification.find({userId})

        if (isEmpty(userVerification)) {
            let message = "Account record doesnt exists or has been verified already. Please sign up or log in"
            return response.redirect(`/user/verify/${message}`)
        } 
        
        const {expiresIn} = userVerification[0];
        let dateExpires = Date.parse(expiresIn.toString())

        let today = Date.now();
        let data = moment.tz(today, "America/Sao_Paulo");
        let dateNow = Date.parse(data.format())
        

        if (dateNow > dateExpires) {
            const deleteUserVerification = await UserVerification.deleteOne({_id: userId})
            let message;
            if (!deleteUserVerification) {
                message = "An error occurred while clearing expired user verification record"
                return response.redirect(`/user/verify/error=true&message=${message}`)
            }

            const deleteUser = await User.deleteOne({userId})

            if (!deleteUser) {
                message = "Clearing user with expired unique string failed"
                return response.redirect(`/user/verify/error=true&message=${message}`)
            }

            message = "Link has expired, Please sign up again."
            return response.redirect(`/user/verify/error=true&message=${message}`)
        } 
       
        const userUniqueString= userVerification[0].uniqueString;
        const authRegistration = await bcrypt.compare(uniqueString, userUniqueString)

        if (authRegistration) {
            const userUpdatedVerified = await User.updateOne({_id: userId}, {verified: true})

            if (!userUpdatedVerified) {
                let message = "An error occurred while updating user record to show verified."
                return response.redirect(`/user/verify/error=true&message=${message}`)
            }

            const deleteVerification = await UserVerification.deleteOne({_id: userId})

            if (!deleteVerification) {
                let message = "An error occurred while finalizing successful verification."
                return response.redirect(`/user/verify/error=true&message=${message}`)
            }

            return response.sendFile(path.join(__dirname, "./../../../../view/verified.html"))

        } else {
            let message = "Invalid verification details passed. Check your inbox"
            return response.redirect(`/user/verify/error=true&message=${message}`)
        }

    }     
}