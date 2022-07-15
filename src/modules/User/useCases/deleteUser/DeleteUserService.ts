import Error from "../../../../error/AppError"
import User from "../../infra/model/User"

interface Request {
    id: string    
}

export default class DeleteUserService{
    public async execute({id}: Request) {
        if (id) {
            const deletedUser = await User.findByIdAndDelete(id)  

            if(deletedUser === null) {
                throw new Error("Not possible to delete user", 500)
            }
            
            return deletedUser;
        } 
    }
}