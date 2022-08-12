import AppError from "../../../../helpers/error/AppError"
import User from "../../infra/model/User"



interface Request {
    userEmail: string
}

export class ForgotPasswordService{
    async execute({userEmail}: Request){

        const findUserByEmail = await User.findOne({email: userEmail})
     
        if(!findUserByEmail) {
            throw new AppError("User with this dosen't email already exists", 404)
        }
        

    }
}