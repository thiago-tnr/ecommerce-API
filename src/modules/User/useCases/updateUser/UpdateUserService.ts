import CryptoJs from 'crypto-js';
import AppError from '../../../../error/AppError';
import User from '../../infra/model/User';

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
            password = CryptoJs.AES.encrypt(password, 
            process.env.PASS_SEC as string).toString()    
        } else {
            throw new AppError("password not set", 403)
        }

        const updatePasswordUser = await User.findOneAndUpdate({_id: id}, 
            {$set: { password: password}}, {new:true})
        
        if (updatePasswordUser) {
            return updatePasswordUser;
        } else {
            throw new AppError("User not found by ID", 404)
        }
    }
}