import AppError from "../../../../helpers/error/AppError"
import User from "../../infra/models/User"

interface Request {
    id:string 
}

export default class GetUserService {
    public async execute({id}: Request) {
        if(id.length === 24){
            const findOneUserById = await User.findById(id)    
            if (findOneUserById) {
                return findOneUserById
            } else {
                throw new AppError("User not found", 404)
            }
        }
        throw new AppError("Invalid Id", 404)
    }
}