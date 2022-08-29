import AppError from "../../../../helpers/appError/AppError"
import User from "../../infra/models/User"

interface Request {
    id: string    
}

export default class DeleteUserService{
    public async execute({id}: Request) {
        if (id) {
            const deletedUser = await User.findByIdAndDelete(id)  

            if(deletedUser === null) {
                throw new AppError("Not possible to delete user", 500)
            }
            
            return deletedUser;
        } 
    }
}