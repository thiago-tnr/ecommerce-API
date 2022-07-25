import AppError from "../../../../helpers/error/AppError";
import { isEmpty } from "../../../../helpers/isEmpty/Empty";
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