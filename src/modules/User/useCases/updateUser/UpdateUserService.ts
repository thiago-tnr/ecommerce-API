import bcrypt from 'bcrypt';
import AppError from '../../../../helpers/error/AppError';
import User from '../../infra/models/User';

interface IUpdateUser{
    id: string
    password: string, 
}
/**
 * [] Atualizar outros dados além do password
 */
export default class UpdateUserService {
    public async execute({id, password}: IUpdateUser) {
        if (password) {
            const saltRounds  = parseInt(process.env.HASHED)
            const hashedPassword = await bcrypt.hash(password, saltRounds) 
            
            const updatePasswordUser = await User.findOneAndUpdate({_id: id}, 
                {$set: { password: hashedPassword}}, {new:true})
            
            if (updatePasswordUser) {
                return updatePasswordUser;
            } else {
                throw new AppError("User not found by ID", 404)
            }
        } else {
            throw new AppError("password not set", 403)
        }

      
    }
}