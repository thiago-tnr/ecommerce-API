import AppError from "../../../../helpers/error/AppError";
import User from "../../infra/model/User";
import CryptoJs from 'crypto-js';
import dotenv from 'dotenv';
import { sendVerficationEmail } from "../../../../helpers/emailVerification/emailVerification";

dotenv.config();

interface Request{
    name: string;
    email: string;
    password?: string;
    isAdmin?: boolean;
    vefified?: boolean;
}
export default class CreateUserService {
    public async execute({name, email, password, isAdmin, vefified}: Request) {
        const checkUserExists = await User.findOne({email: email})
        const checkUserNameExists = await User.findOne({username: name})

        if (checkUserExists && checkUserNameExists) {
            throw new AppError('Email adress or userName already used', 409)
        }
       
        if (name && email && password ||isAdmin) {
            const newUser = new User({
                username: name,
                email,
                password: CryptoJs.AES.encrypt(password, 
                process.env.PASS_SEC as string).toString(),
                isAdmin,
                vefified
            })
            
            const savedUser = await newUser.save()

            const userId = (savedUser._id).toString()

            return [savedUser, userId ];
        }
    }
}