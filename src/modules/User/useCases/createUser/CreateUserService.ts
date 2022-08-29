import AppError from "../../../../helpers/appError/AppError";
import User from "../../infra/models/User";
import bcrypt from 'bcrypt';

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
        
        if (checkUserExists) {
            throw new AppError('Email adress already used', 409)
        }
        
        const checkUserNameExists = await User.findOne({username: name})

        if (checkUserNameExists) {
            throw new AppError('UserName already used', 409)
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