import AppError from "../../../../helpers/error/AppError";
import User from "../../infra/models/User";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

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
       
        const saltRounds  = parseInt(process.env.HASHED)
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        if (name && email && password ||isAdmin) {
            const newUser = new User({
                username: name,
                email,
                password: hashedPassword,
                isAdmin,
                vefified
            })
            
            const savedUser = await newUser.save()

            const userId = (savedUser._id).toString()

            return [savedUser, userId ];
        }
    }
}