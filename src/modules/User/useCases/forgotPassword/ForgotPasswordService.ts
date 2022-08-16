import AppError from "../../../../helpers/error/AppError"
import User from "../../infra/models/User"



interface Request {
    userEmail: string
}

export class ForgotPasswordService{
    async execute({userEmail}: Request){

     
    }
}