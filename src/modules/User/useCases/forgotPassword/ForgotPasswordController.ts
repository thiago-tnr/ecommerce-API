import { Request, Response } from "express";
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt"
import PasswordReset from "../../infra/models/PasswordReset";
import User from "../../infra/models/User";
import { isEmpty } from "../../../../helpers/isEmpty/Empty";

dotenv.config();
export class ForgotPasswordController {

   // constructor(private forgotPasswordService: ForgotPasswordService){}
    async handle(request: Request, response: Response){
        const {email, redirectUrl} = request.body

        if (!email) {
            return response.status(400).json('Missing JSON args - email')
        }

        const findUserByEmail = await User.findOne({email: email})
        const userId = (findUserByEmail._id).toString()

        if(!findUserByEmail) {
            return response.status(400).json({ message: "User with this dosen't email already exists"})
        }

        if(!findUserByEmail.verified) {
            return response.status(400).json({ message: "email hasn't been verified yet. Check yout inbox ou try create user again"})
        }

        const sendResetEmail = async (userId: string, email: string, redirectUrl: string, response: Response) =>{

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
                return response.status(400).json({ message:'Not possible to create the vefication'})    
            }

            resetUserPassword.save()
            if (!resetUserPassword){
              
            } else {
                transporter.sendMail(mailOptions)
                return true
            }
        }

        const emailSended = sendResetEmail(userId, email, redirectUrl, response);
        if (emailSended){
            return response.json({message: "Password reset email sent", status: 'PENDING'})
        }
        
    }
}