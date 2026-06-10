import { z } from "zod";
import { GameCategories } from "@/domain/entities/game";

export const createGameSchema = z.object({
    code: z.string(),
    name: z.string(),
    category: z.enum(GameCategories),
    description: z.string(),
    minPlayers: z.coerce.number().int(),
    maxPlayers: z.coerce.number().int(),
    minAge: z.coerce.number().int(),
});