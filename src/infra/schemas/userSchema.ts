import { email, z } from "zod"

export const userSchema = z.object({
    email: z.email(),
    username: z.string(),
    password: z.string(),
});

export const loginSchema = z.object({
    email: z.email(),
    password: z.string()
});