import { Schema, model } from "mongoose";

const LinkSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    { _id: false, timestamps: false }
);

const contactsSchema = new Schema(
    {
        phones: {
            type: [String],
            required: true,
        },
        emails: {
            type: [String],
            required: true,
        },
        links: [LinkSchema],
    },
    { _id: false, timestamps: false }
);

const propertySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        mode: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        area: {
            type: Number,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        source: {
            type: String,
            required: true,
        },
        furnished: {
            type: Boolean,
            required: true,
        },
        beds: {
            type: Number,
            required: true,
        },
        baths: {
            type: Number,
            required: true,
        },
        balcony: {
            type: Boolean,
            required: true,
        },
        elevator: {
            type: Boolean,
            required: true,
        },
        parking: {
            type: Boolean,
            required: true,
        },
        security: {
            type: Boolean,
            required: true,
        },
        location: {
            type: [Number],
            required: true,
        },
        images: {
            type: [String],
            required: true,
        },
        contacts: contactsSchema,
    },
    { timestamps: true }
);

const propertyModel = model("User", propertySchema);
export default propertyModel;
