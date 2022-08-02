import AppError from "../../../../helpers/error/AppError"
import { isEmpty } from "../../../../helpers/isEmpty/Empty"
import Order from "../../infra/model/Order"


interface Request {
    userId: string
}

export class GetUserOrderService{
    async execute({userId}: Request){

        const getOrderByUserId = await Order.find({userId:userId})
        console.log(getOrderByUserId)
        if (!getOrderByUserId) {
            throw new AppError("Order not found", 404)
        }
        
        return getOrderByUserId;
    }
}