import mongoose, { AnyArray, connection, model, Schema } from "mongoose";

type ProductType = {
    title: string,
    desc: string,
    img: string,
    categories: object,
    size: object,
    color: object,
    price: number,
    inStock: boolean
}

const ProductsSchema = new Schema<ProductType>({
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    categories: { type: Object },
    size: { type: Object },
    color: { type: Object },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true });

const modelName: string = "Product";

export default mongoose.model<ProductType>(modelName, ProductsSchema)

// export default (connection && connection.models[modelName])
//     ? connection.models[modelName]
//     : model<ProductType>(modelName, ProductsSchema)