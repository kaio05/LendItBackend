import { GameCategories } from "@/domain/entities/game"

export type gameDTO = {
    id?: string
    code?: number
    name?: string
    category?: GameCategories
    description?: string
    minPlayers?: number
    maxPlayers?: number
    minAge?: number
    imagePath?: string
    userId?: string
}