import AppError from "../../../../helpers/error/AppError";
import Cart from "../../infra/model/Cart";

interface Request {
    dataToUpdate: Object,
    cartId: string
}
export class UpdateCartService {
    async execute({dataToUpdate, cartId}: Request){
        const cartUpdated = await Cart.findByIdAndUpdate(
            cartId,
            {$set: dataToUpdate},
            {new: true}
        )
        if (!cartUpdated) {
            throw new AppError('Cart not found', 404)
        }

        return cartUpdated;
    }    
}