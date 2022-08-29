import AppError from "../../../../helpers/appError/AppError";
import User from "../../infra/models/User";
import bcrypt from 'bcrypt';

interface Request {
    email: string,
    inputPassword: string,
    token?:string
}

export default class LoginUserService{
    public async execute({email, inputPassword}: Request){
        if (email && inputPassword) {
            
            const user = await User.findOne({email}) 

            const userVerified = user.verified
            
            if (!userVerified) {
                throw new AppError("Not possible to login, account not verified", 403)
            }

            if (!user) {
                throw new AppError("Email or password wrong, or user not found, try again", 403)
            }

            const hashedPassword = user.password
            
            const compareHashedPassword = await bcrypt.compare(inputPassword, hashedPassword)

            if (!compareHashedPassword) {
                throw new AppError("Email or password wrong, try again", 403)
            }

        return user;
        } else {
            throw new AppError("Email or password worng, try again", 403)
        }
    }
}