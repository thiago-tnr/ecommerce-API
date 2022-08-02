import { response, Router } from "express";
import { verifyToken } from "../../../../middleware/middleware";
import { createOrderController } from "../../useCases/createOrder";
import { getUserOrderController } from "../../useCases/getOrder";

export const orderRoutes = Router();

orderRoutes.get('/ping', (request, response) => {
    return response.json({message: "pong"});
})

orderRoutes.post('/', verifyToken,(request, response) =>{
    return createOrderController.handle(request, response)
})

orderRoutes.get('/find/:id', (request, response) =>{
    return getUserOrderController.handle(request, response)
})

