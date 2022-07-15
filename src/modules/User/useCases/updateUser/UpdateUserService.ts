import CryptoJs from 'crypto-js';
import Error from '../../../../error/AppError';
import User from '../../infra/model/User';

interface IUpdateUser{
    id: string
    password: string, 
}

export default class UpdateUserService {
    public async execute({id, password}: IUpdateUser) {
        if (password) {
            password = CryptoJs.AES.encrypt(password, 
            process.env.PASS_SEC as string).toString()    
        } else {
            throw new Error("password not set", 403)
        }
        try {
            const updatePasswordUser = await User.findOneAndUpdate({_id: id}, 
                {$set: { password: password}}, {new:true})
            return updatePasswordUser;
        } catch (error) {
            throw new Error("not possible to update password", 403)
        }
    }
}