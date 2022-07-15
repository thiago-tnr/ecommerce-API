import { connection, model, Schema } from "mongoose";

type OrderType = {
    userId: string,
    products: {
        productId : string, 
        quantity: number
    },
    amount: number,
    address: object,
    status: string,
}

const OrderSchema = new Schema<OrderType>({
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
 { timestamps: true });

const modelName: string = "Order";

export default (connection && connection.models[modelName])
  ? connection.models[modelName]
  : model<OrderType>(modelName, OrderSchema)