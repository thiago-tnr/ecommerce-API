import AppError from "../../../../helpers/appError/AppError";
import Order from "../../infra/model/Order";



export class GetAllOrdersService {
    async execute(){
        const getOrders = await Order.find();

        if (!getOrders) {
            throw new AppError('No order found', 404)    
        }

        return getOrders;
    }
}