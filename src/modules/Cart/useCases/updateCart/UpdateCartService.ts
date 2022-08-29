import AppError from "../../../../helpers/appError/AppError";
import Cart from "../../infra/model/Cart";

interface Request {
    dataToUpdate: Object,
    cartId: string
}
export class UpdateCartService {
    async execute({dataToUpdate, cartId}: Request){
        const verifyUserId = Object.values(dataToUpdate);
        let userid = (verifyUserId[0]);
        const getUserCart = await Cart.findById(cartId);
        
        if (userid !== getUserCart.userId) {
            throw new AppError('Cart not belong this user', 403)
        }
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