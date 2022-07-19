import { Router } from "express";
import { verifyToken } from "../../../../middleware/middleware";
import { createCartController } from "../../useCases/createCart";

export const cartRoutes = Router();

cartRoutes.get('/ping', (request, response) => {
    return response.json({message: "pong"});
})

cartRoutes.post('/new', verifyToken, (request, response) =>{
    return createCartController.handle(request, response)
})