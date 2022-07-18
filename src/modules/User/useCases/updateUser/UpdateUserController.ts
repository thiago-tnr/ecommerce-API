import { Request, Response } from "express";
import UpdateUserService from "./UpdateUserService";

/**
 * [] aqui estamos atualizando somente o password do usuario, temos que atulizar outros dados também
 * nova rota ou atualizar aqui ?
 * [] validar se o password é diferente do que já está dentro do banco de dados
 * [] caracteres minimos para o password
 * [] regex para verificar se tem caracteres especiais
 */
export class UpdateUserController{
    constructor(private updateUserService: UpdateUserService ){}
    async handle(request: Request, response: Response){
        const {password} = request.body;
        const {id} = request.params;
        const updatePassword = await this.updateUserService.execute({id, password})
        updatePassword.password = undefined;
        return response.status(200).json({updatePassword})
    }
}