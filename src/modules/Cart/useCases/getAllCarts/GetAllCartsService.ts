import AppError from "../../../../helpers/appError/AppError";
import { isEmpty } from "../../../../helpers/empty/Empty";
import Cart from "../../infra/model/Cart";

export class GetAllCartsService {
    async execute(){
        const carts = await Cart.find()
        if (isEmpty(carts)) {
            throw new AppError("No carts created", 404)
        }
        return carts;
    }
}