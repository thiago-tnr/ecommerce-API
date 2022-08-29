import AppError from "../../../../helpers/appError/AppError"
import { isEmpty } from "../../../../helpers/empty/Empty"
import Order from "../../infra/model/Order"

interface Request{
    orderId: string
}

export class DeleteOrderService {
    async execute({orderId}: Request){
        const deleteOrder = await Order.findByIdAndDelete(orderId)

        if (!deleteOrder) {
            throw new AppError("Order not found ou deleted", 404)
        }

        return deleteOrder;
    }
}