import AppError from "../../../../helpers/appError/AppError";
import Order from "../../infra/model/Order";

interface Request {
    userId: string;
    products: {
        productId:string;
        quantity: number
    };
    amount: number;
    address: object;
}

export class CreateOrderService {
    async execute({userId,products:{productId,quantity},amount,address}:Request) {
        const newOrder = await new Order({
            userId,
            products:{
                productId,
                quantity
            },
            amount,
            address
        })

        if(newOrder){
            const createNewOrder = await newOrder.save()
            return createNewOrder;
        } else {
            throw new AppError("Order not created", 401)
        }
        
    }
} 