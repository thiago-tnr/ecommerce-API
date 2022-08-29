import AppError from "../../../../helpers/appError/AppError"
import Cart from "../../infra/model/Cart"

interface Request {
    userId : string
}
export class GetUserCartService{
    async execute({userId}: Request){
        const getUserCart = await Cart.findOne({userId})
        if (!getUserCart) {
            throw new AppError("User cart not found", 404)
        }
        return getUserCart;
    }
}