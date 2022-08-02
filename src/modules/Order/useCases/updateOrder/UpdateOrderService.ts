import AppError from "../../../../helpers/error/AppError";
import Order from "../../infra/model/Order"


interface Request {
    updateOrder: any;
    orderId: string;
}

export class UpdateOrderService {
    async execute({updateOrder, orderId}: Request){
        const changeStatus = await Order.findByIdAndUpdate(
            orderId,
            {$set: updateOrder}
            ,
            { new: true });
        
        if (!changeStatus) {
            throw new AppError("Not possible to update the status", 400)
        }

        return changeStatus;
    }
}