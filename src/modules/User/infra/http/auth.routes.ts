import { Router } from "express";
import { loginUserController } from "../../useCases/loginUser";
import path from 'path';
export const authRouter = Router();

authRouter.post('/', async (request, response) => {
   return loginUserController.handle(request, response)
})

authRouter.get('/verified/:?error', async (request, response) => {
   response.sendFile(path.join(__dirname, "./../../../../view/ververifiedErrorfied.html"))
})
