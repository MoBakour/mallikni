import { Schema, model } from "mongoose";

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
    },
    { timestamps: true }
);

const userModel = model("User", UserSchema);
export default userModel;
