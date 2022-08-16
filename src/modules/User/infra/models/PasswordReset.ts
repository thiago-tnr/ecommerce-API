import mongoose, { Schema, trusted } from "mongoose";

type ForgotPassword = {
    userId: string,
    passwordString: string,
    createdAt: Date,
    expiresIn: Date,
}

const ForgotPasswordSchema = new Schema<ForgotPassword>({
    userId: { type: String, unique: true },
    passwordString: { type: String,  unique: true},
    createdAt: { type: Date },
    expiresIn: { type: Date },
});

const modelName: string = "ForgotPasswordSchema";

export default mongoose.model<ForgotPassword>(modelName, ForgotPasswordSchema)
