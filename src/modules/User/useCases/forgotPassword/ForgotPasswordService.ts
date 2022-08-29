import nodemailer from 'nodemailer'
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt"
import PasswordReset from "../../infra/models/PasswordReset";
import User from "../../infra/models/User";
import { isEmpty } from "../../../../helpers/empty/Empty";
import AppError from "../../../../helpers/appError/AppError";
interface Request {
    email: string;
    redirectUrl: string;
}

export class ForgotPasswordService{
    async execute({email, redirectUrl}: Request){

        const findUserByEmail = await User.findOne({email: email})
        const userId = (findUserByEmail._id).toString()

        if(!findUserByEmail) {
            throw new AppError("User with this dosent email already exists", 400)
        }

        if(!findUserByEmail.verified) {
            throw new AppError('Missing JSON args - email', 400)
        }

        const sendResetEmail = async (userId: string, email: string, redirectUrl: string) =>{

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth:{
                    user: process.env.AUTH_EMAIL,
                    pass: process.env.AUTH_PASSWORD
                }
            })

            const resetString = (uuidv4() + userId);
            //delete all the requests off reset password 
            await PasswordReset.deleteMany({userId});
           // const currentUrl = "https://localhost:3030/"
            const mailOptions = {
                from: process.env.AUTH_EMAIL,
                to: email,
                subject: 'Password Reset',
                html: `<p>We heard that you lost the password.</p><p>Don't worry, use the link below to reset it</p>
                <br/> <p> This link <b> expires in 30 minutes </b>. Click in the link to verify your acconut</p>
                <a href=${redirectUrl + "/" + userId + "/" + resetString}>Press here</a>`
            }
        
            const saltRounds  = parseInt(process.env.HASHED)
            let hashedUniqueString = await bcrypt.hash(resetString, saltRounds)
            const resetUserPassword = new PasswordReset({
                userId: userId,
                passwordString: hashedUniqueString,
                createdAt: Date.now(),
                expiresIn: Date.now() + 1800000
            })

            if(isEmpty(resetUserPassword)) {
                throw new AppError('Not possible to create the vefication', 400)
            }

            resetUserPassword.save()

            if (!resetUserPassword){
              throw new AppError('Not possible to reset the password', 400)
            } else {
                transporter.sendMail(mailOptions)
                return true
            }
        }

        const emailSended = sendResetEmail(userId, email, redirectUrl);

        if (emailSended){
            return true;
        } else {
            throw new AppError('Not possible to send email to reset password', 400)
        }
     
    }
}