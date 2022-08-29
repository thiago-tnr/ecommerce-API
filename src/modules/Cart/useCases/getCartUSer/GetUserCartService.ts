import AppError from "../../../../helpers/appError/AppError"
import Cart from "../../infra/model/Cart"

interface Request {
    id : string
}
export class GetUserCartService{
    async execute({id}: Request){
        const getUserCart = await Cart.findOne({id})
        if (!getUserCart) {
            throw new AppError("User cart not found", 404)
        }
        return getUserCart;
    }
}