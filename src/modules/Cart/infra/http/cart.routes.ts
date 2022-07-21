import { Router } from "express";
import { verifyToken, verifyTokenAndAuthorization } from "../../../../middleware/middleware";
import { createCartController } from "../../useCases/createCart";
import { deleteCartController } from "../../useCases/deleteCart";

export const cartRoutes = Router();

cartRoutes.get('/ping', (request, response) => {
    return response.json({message: "pong"});
})

cartRoutes.post('/new', verifyToken, (request, response) =>{
    return createCartController.handle(request, response)
})

cartRoutes.delete('/delete/:id', verifyTokenAndAuthorization, (request, response) =>{
    return deleteCartController.handle(request, response)
})