import Error from "../../../../error/AppError";
import User from "../../infra/model/User";
import CryptoJs from 'crypto-js';
import dotenv from 'dotenv';

dotenv.config();

interface Request{
    name: string;
    email: string;
    password?: string;
    isAdmin?: boolean
}
export default class CreateUserService {
    public async execute({name, email, password, isAdmin}: Request) {
        const checkUserExists = await User.findOne({email: email})
        const checkUserNameExists = await User.findOne({username: name})

        if (checkUserExists && checkUserNameExists) {
            throw new Error('Email adress or userName already used', 409)
        }
        
        if (name && email && password ||isAdmin) {
            const newUser = new User({
                username: name,
                email,
                password: CryptoJs.AES.encrypt(password, 
                process.env.PASS_SEC as string).toString(),
                isAdmin
            })
            const savedUser = await newUser.save()
            return savedUser;
        }
    }
}