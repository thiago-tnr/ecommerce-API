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
          required: true 
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        _id: false
      },
    ],
  },
  { timestamps: true });

const modelName: string = "Cart";

export default (connection && connection.models[modelName])
    ? connection.models[modelName]
    : model<CartType>(modelName, CartSchema)