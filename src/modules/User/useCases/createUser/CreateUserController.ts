import { Request, Response } from "express";
import { CreateUserVerificationService } from "./CreateUserVerificationService";
import CreateUserService from "./CreateUserService";
import AppError from "../../../../helpers/appError/AppError";

/**
 * [x]validar os dados vindo do body
 * [x] validar password
 * [x] caracteres minimos para o password
 * [x] validar email
 */
export class CreateUserController {
    constructor(
        private createUserService: CreateUserService, 
        private createUserVerificationService: CreateUserVerificationService){}

    async handle (request: Request, response: Response) {
    const {name, isAdmin, email, password} = request.body;

    if(!name && !isAdmin && !email && !password) {
        throw new AppError('Missing JSON args', 404)
    }

    if (password.length < 8){
        throw new AppError('Password must be at least 8 characters long', 400)
    }
    const user = await this.createUserService.execute({name, email, password, isAdmin});

    let userId = user[1].toString();

    let sendEmail = await this.createUserVerificationService.execute({userId, email})
    
    if (sendEmail) {
        return response.status(202).json({"message" : "User created, Confirmation PENDDING"}); 
    }
  
    }
}

