import { Schema, model } from "mongoose";
import { generateActivationCode } from "../utils/utils";

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        favorites: {
            type: [Schema.Types.ObjectId],
            ref: "Property",
            default: [],
        },
        avatar: {
            type: String,
            default: "",
        },
        activation: {
            activated: {
                type: Boolean,
                default: false,
            },
            code: {
                type: String,
                default: generateActivationCode,
                select: false,
            },
            attempts: {
                type: Number,
                default: 5,
                select: false,
            },
        },
    },
    { timestamps: true }
);

const userModel = model("User", UserSchema);
export default userModel;
