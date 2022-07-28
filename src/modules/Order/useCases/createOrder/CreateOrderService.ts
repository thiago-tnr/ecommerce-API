import AppError from "../../../../helpers/error/AppError";
import Order from "../../infra/model/Order";

interface Request {
    userId: string;
    product: {
        productId:string;
        quantity: number
    };
    amount: number;
    address: object;
}

export class CreateOrderService {
    async execute({userId,product:{productId,quantity},amount,address}:Request) {
        const newOrder = await new Order({
            userId,
            product:{
                productId,
                quantity
            },
            amount,
            address
        })

        if(!newOrder){
            throw new AppError('Order not created', 401)
        }
        
        return newOrder;
    }
} 