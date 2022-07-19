import { isEmpty } from "../../../../helpers/isEmpty/Empty";
import AppError from "../../../../helpers/error/AppError"
import Cart from "../../infra/model/Cart"

interface Request {
    userId: string,
    products: {
        productId : string, 
        quantity: number
    }
}

export class CreateCartService {
    async execute({userId,products:{productId, quantity} }:Request) {
        const newUserCart = new Cart({
            userId,
            products: {
                productId,
                quantity,
            }
        });
        const createdNewCart = await newUserCart.save();

        if (isEmpty(createdNewCart)) {
            throw new AppError("Cart is empty", 404)
        }
        return createdNewCart;
    }
}