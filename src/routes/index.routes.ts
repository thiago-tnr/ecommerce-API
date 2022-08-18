import { Router } from "express";
import { refreshToken, verifyTokenAndAdmin } from "../middleware/middleware";
import { cartRoutes } from "../modules/Cart/infra/http/cart.routes";
import { orderRoutes } from "../modules/Order/infra/http/order.routes";
import { productsRouter } from "../modules/Product/infra/http/product.routes";
import { productsRouterNotAuth } from "../modules/Product/infra/http/product.routesNotAuth";
import { authRouter } from "../modules/User/infra/http/auth.routes";
import { userRoutes } from "../modules/User/infra/http/user.routes";

export const indexRoutes = Router();

indexRoutes.get('/ping', (request, response) => {
    return response.json({message: "pong"});
})
console.log('first')
indexRoutes.use('/user', userRoutes)
indexRoutes.use('/login', authRouter);
indexRoutes.use('/products',verifyTokenAndAdmin, productsRouter)
indexRoutes.use('/find-products', productsRouterNotAuth)
indexRoutes.use('/cart', cartRoutes)
indexRoutes.use('/order/', orderRoutes)
indexRoutes.post('/refresh-token', refreshToken)