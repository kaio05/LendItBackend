import { GameCategories } from "@/domain/entities/game"

export type gameDTO = {
    id?: string
    code: string
    name?: string
    category?: GameCategories
    description?: string
    minPlayers?: number
    maxPlayers?: number
    minAge?: number
    imagePath?: string
    userId?: string
}