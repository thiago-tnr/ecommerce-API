import { connection, model, Schema } from "mongoose";

type CartType = {
    userId: string,
    products: {
        productId : string, 
        quantity: number
    }
}

const CartSchema = new Schema<CartType>({
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
  },
  { timestamps: true });

const modelName: string = "Cart";

export default (connection && connection.models[modelName])
    ? connection.models[modelName]
    : model<CartType>(modelName, CartSchema)