import { z } from "zod"

export const userSchema = z.object({
    email: z.email(),
    username: z.string(),
    password: z.string()
});

export const updateUserSchema = z.object({
    email: z.email().optional(),
    password: z.string().optional(),
    username: z.string().optional()
});

export const loginSchema = z.object({
    email: z.email(),
    password: z.string()
});