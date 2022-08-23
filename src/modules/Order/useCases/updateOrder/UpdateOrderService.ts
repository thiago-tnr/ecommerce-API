import AppError from "../../../../helpers/error/AppError";
import Order from "../../infra/model/Order"


interface Request {
    updateOrder: any;
    orderId: string;
}

export class UpdateOrderService {
    async execute({updateOrder, orderId}: Request){

        const orderIsPaid = await Order.findById({_id: orderId})

        if(orderIsPaid.status === "Paied"){
            throw new AppError("Not possible to update this order, because is paid", 400)
        }

        const changeStatus = await Order.findByIdAndUpdate(
            orderId,
            {$push: updateOrder}
        );

        if (!changeStatus) {
            throw new AppError("Not possible to update the status", 400)
        }

        return changeStatus;
    }
}