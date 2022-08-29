import AppError from "../../../../helpers/appError/AppError"
import { isEmpty } from "../../../../helpers/empty/Empty"
import Order from "../../infra/model/Order"


interface Request {
    userId: string
}

export class GetUserOrderService{
    async execute({userId}: Request){

        const getOrderByUserId = await Order.find({userId:userId})
        if (!getOrderByUserId) {
            throw new AppError("Order not found", 404)
        }
        
        return getOrderByUserId;
    }
}