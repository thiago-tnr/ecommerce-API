import { Router } from "express";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../../../../middleware/middleware";
import { createCartController } from "../../useCases/createCart";
import { deleteCartController } from "../../useCases/deleteCart";
import { getAllCartsController } from "../../useCases/getAllCarts";
import { getUserCartContrller } from "../../useCases/getCartUSer";
import { updateCartController } from "../../useCases/updateCart";

export const cartRoutes = Router();

cartRoutes.get('/ping', (request, response) => {
    return response.json({message: "pong"});
})

cartRoutes.post('/', verifyToken, (request, response) =>{
    return createCartController.handle(request, response)
})

cartRoutes.delete('/:id', verifyTokenAndAuthorization, (request, response) =>{
    return deleteCartController.handle(request, response)
})

cartRoutes.get('/carts', verifyTokenAndAdmin, (request, response) => {
    return getAllCartsController.handle(request, response)
})

cartRoutes.get('/:id', verifyTokenAndAuthorization, (request, response) =>{
    return getUserCartContrller.handle(request, response)
})

cartRoutes.put('/:id', verifyTokenAndAuthorization, (request, response) =>{
    return updateCartController.handle(request, response)
})