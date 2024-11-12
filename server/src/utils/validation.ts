import zod from "zod";

export const userSchema = zod.object({
    email: zod
        .string({ message: "Email must be a string" })
        .min(1, "Email is required")
        .email("Invalid email address")
        .max(254, "Email cannot exceed 254 characters"),
    username: zod
        .string({ message: "Username must be a string" })
        .min(1, "Username is required")
        .min(3, "Username must be at least 3 characters long")
        .max(30, "Username cannot exceed 30 characters")
        .regex(
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers, and underscores"
        ),
    password: zod
        .string({ message: "Password must be a string" })
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters long")
        .max(100, "Password cannot exceed 100 characters"),
    repassword: zod
        .string({
            message: "Password confirmation must be a string",
        })
        .min(1, "Password confirmation is required"),
});

export const createUserSchema = userSchema.refine(
    (data) => data.password === data.repassword,
    {
        message: "Passwords don't match",
        path: ["repassword"],
    }
);

export const updateUserSchema = userSchema.partial();

export const propertySchema = zod.object({
    title: zod
        .string({ message: "Title must be a string" })
        .min(1, "Title is required")
        .max(100, "Title cannot exceed 100 characters"),
    description: zod
        .string({ message: "Description must be a string" })
        .min(1, "Description is required")
        .max(1000, "Description cannot exceed 1000 characters"),
    mode: zod.enum(["rent", "sale"], { message: "Invalid mode" }),
    category: zod.enum(["residential", "commercial"], {
        message: "Invalid category",
    }),
    country: zod
        .string({ message: "Country must be a string" })
        .min(1, "Country is required"),
    city: zod
        .string({ message: "City must be a string" })
        .min(1, "City is required"),
    price: zod.number({ message: "Price must be a number" }),
    area: zod.number({ message: "Area must be a number" }),
    frequency: zod.enum(["week", "month", "year", ""], {
        message: "Invalid frequency",
    }),
    currency: zod
        .string({ message: "Currency must be a string" })
        .min(1, "Currency is required")
        .max(20, "Currency cannot exceed 20 characters"),
    age: zod.number({ message: "Age must be a number" }),
    beds: zod.number({ message: "Beds must be a number" }),
    baths: zod.number({ message: "Baths must be a number" }),
    furnished: zod.boolean({ message: "Furnished must be a boolean" }),
    balcony: zod.boolean({ message: "Balcony must be a boolean" }),
    elevator: zod.boolean({ message: "Elevator must be a boolean" }),
    parking: zod.boolean({ message: "Parking must be a boolean" }),
    security: zod.boolean({ message: "Security must be a boolean" }),
    location: zod.tuple([zod.number(), zod.number()]),
});
