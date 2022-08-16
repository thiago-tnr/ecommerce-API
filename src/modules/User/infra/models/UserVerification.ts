import mongoose, { Schema, trusted } from "mongoose";

type UserVerification = {
    userId: string,
    uniqueString: string,
    createdAt: Date,
    expiresIn: Date,
}

const UserVerificationSchema = new Schema<UserVerification>({
    userId: { type: String, unique: true },
    uniqueString: { type: String,  unique: true},
    createdAt: { type: Date },
    expiresIn: { type: Date },
});

const modelName: string = "UserVerification";

export default mongoose.model<UserVerification>(modelName, UserVerificationSchema)
