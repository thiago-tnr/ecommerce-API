import mongoose, { Schema } from "mongoose";

type UserType = {
    username: string,
    email: string,
    password: string,
    isAdmin: boolean,
}

const UserSchema = new Schema<UserType>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
}, { timestamps: true });

const modelName: string = "User";

export default mongoose.model<UserType>(modelName, UserSchema)

// export default (connection && connection.models[modelName])
// ? connection.models[modelName]
// : mongoose.model<UserType>(modelName, UserSchema)