import AppError from "../../../../helpers/error/AppError";
import User from "../../infra/model/User";
import CryptoJs from 'crypto-js';
import dotenv from 'dotenv';

dotenv.config();

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
                throw new AppError("Email or password wrong, try again", 403)
            }

            const hashedPassword = CryptoJs.AES.decrypt(
                user.password,
                process.env.PASS_SEC,
            );

            const passwordSetInDb = hashedPassword.toString(CryptoJs.enc.Utf8);
            const passwordSetInBody = inputPassword;

            if (passwordSetInBody != passwordSetInDb) {
                throw new AppError("Email or password wrong, try again", 403)
            }

        return user;
        } else {
            throw new AppError("Email or password worng, try again", 403)
        }
    }
}