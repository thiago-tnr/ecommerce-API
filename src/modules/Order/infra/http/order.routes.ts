import { request, response, Router } from "express";
import { verifyToken } from "../../../../middleware/middleware";
import { createOrderController } from "../../useCases/createOrder";
import { getAllOrdersController } from "../../useCases/getAllOrders";
import { getMonthlyIncomeController } from "../../useCases/getMonthlyIncome";
import { getUserOrderController } from "../../useCases/getOrder";
import { paymentOrderWithCardController } from "../../useCases/paymentOrderWithCard";
import { updateOrderController } from "../../useCases/updateOrder";

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

orderRoutes.put('/:id', (request, reseponse)=>{
    return updateOrderController.handle(request, reseponse)
})

orderRoutes.get('/all', (request, response) =>{
    return getAllOrdersController.handle(request, response)
})

orderRoutes.get('/incomes', (request, response) =>{
    return getMonthlyIncomeController.handle(request, response)
})

orderRoutes.post('/payment', (request, response) => {
    return paymentOrderWithCardController.handle(request, response)
})

