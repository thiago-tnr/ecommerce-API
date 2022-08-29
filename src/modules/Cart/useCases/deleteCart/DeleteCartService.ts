import AppError from "../../../../helpers/appError/AppError";
import { isEmpty } from "../../../../helpers/empty/Empty";
import Cart from "../../infra/model/Cart"

interface Request {
    cartId: string
}

export class DeleteCartService {
    async execute({cartId}: Request) {
        const deleteCart = await Cart.findByIdAndDelete(cartId);
      
        if (deleteCart === null) {
            throw new AppError("Cart no found", 404)
        }
        return deleteCart;
    }

}