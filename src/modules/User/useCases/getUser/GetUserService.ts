import AppError from "../../../../helpers/error/AppError"
import User from "../../infra/model/User"

interface Request {
    id:string 
}

export default class GetUserService {
    public async execute({id}: Request) {
        if(id){
            const findOneUserById = await User.findById(id)    
            if (findOneUserById) {
                return findOneUserById
            } else {
                throw new AppError("User not found", 404)
            }
        }
    }
}