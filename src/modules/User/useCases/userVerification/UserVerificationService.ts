import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt"
import UserVerification from '../../infra/model/UserVerification';
import { isEmpty } from '../../../../helpers/isEmpty/Empty';
import AppError from '../../../../helpers/error/AppError';

dotenv.config();

interface Request {
    userId: string, 
    email: string,
}

export class UserVerificationService{
    async execute({userId, email}: Request){
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASSWORD
            }
        })

        transporter.verify((err, success) => {
            if (err) {
                console.log(err)
            } else {
                console.log('Ready for msg')
                console.log(success)
            }
        })

        const currentUrl = "https://localhost:3030/"
        const uniqueString = (uuidv4() + userId)
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: 'Verify your email account',
            html: `<p> Verfiy your email adress to complete the signup and login into to your account. </p>
            <br/> <p> This link <b> expires in 30 minutes </b>. Click in the link to verify your acconut</p>
            <a href=${currentUrl + "user/verify/" + userId + "/" + uniqueString}>Press here</a>`
        }

        const saltRounds  = parseInt(process.env.HASHED)
        let hashedUniqueString = await bcrypt.hash(uniqueString, saltRounds)
        const newVerification = new UserVerification({
            userId: userId,
            uniqueString: hashedUniqueString,
            createdAt: Date.now(),
            expiresIn: Date.now() + 1800000
        })

        newVerification.save()

        if(isEmpty(newVerification)) {
            throw new AppError('Not possible to create the vefication', 400)    
        } else {
            transporter.sendMail(mailOptions)
            return true;
        }

    }
}
