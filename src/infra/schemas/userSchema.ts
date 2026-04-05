import { email, z } from "zod"

export const userSchema = z.object({
    email: z.email(),
    username: z.string(),
    password: z.string(),
});

export const updateUserSchema = z.object({
    email: z.email().optional(),
    username: z.string().optional(),
    password: z.string().optional(),
});

export const loginSchema = z.object({
    email: z.email(),
    password: z.string()
});