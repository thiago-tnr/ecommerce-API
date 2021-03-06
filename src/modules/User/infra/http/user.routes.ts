import { request, Router } from "express";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../../../../middleware/middleware";
import { createUserController } from "../../useCases/createUser";
import { deleteUserController } from "../../useCases/deleteUser";
import { getAllUsersController } from "../../useCases/getAllUsers";
import { getUserController } from "../../useCases/getUser";
import { getUserStatsController } from "../../useCases/getUserStats";
import { updateUserController } from "../../useCases/updateUser";

export const userRoutes = Router();

/**
 * [] Fazer validação de user e email
 */
userRoutes.post("/create-user", async (request, response) => {
    return createUserController.handle(request, response)
})

//essa rota é usada para atualizar o password
/**
 * [] Verificar nova senha
 * [] nova não pode ser igual a antiga
 * [] salvar nova senha
 */
userRoutes.put("/update-user/:id", verifyTokenAndAuthorization, async (request, response) => {
   return updateUserController.handle(request, response)
})

userRoutes.delete("/delete-user/:id", verifyTokenAndAuthorization, async (request, response) => {
   return deleteUserController.handle(request, response)
})

userRoutes.get("/find-user/:id", verifyTokenAndAdmin, async (request, response) => {
   return getUserController.handle(request, response)
})

userRoutes.get("/find-all-users", verifyTokenAndAdmin, async (request, response) =>{
    return getAllUsersController.handle(request, response)
})

userRoutes.get("/user-stats", verifyTokenAndAdmin,async (request, response) => {
   return getUserStatsController.handle(request, response)
})