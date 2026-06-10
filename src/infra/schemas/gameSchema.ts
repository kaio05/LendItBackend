import { z } from "zod";
import { GameCategories } from "@/domain/entities/game";

export const createGameSchema = z.object({
    code: z.string(),
    name: z.string(),
    category: z.enum(GameCategories),
    description: z.string(),
    minPlayers: z.number().int(),
    maxPlayers: z.number().int(),
    minAge: z.number().int(),
});