import { z } from "zod";

export const gameSchema = z.object({
    code: z.string(),
    name: z.string(),
    category: z.string(),
    description: z.string()
});

