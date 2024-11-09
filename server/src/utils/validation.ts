import zod from "zod";

export const userSchema = zod
    .object({
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
    })
    .refine((data) => data.password === data.repassword, {
        message: "Passwords don't match",
        path: ["repassword"],
    });
