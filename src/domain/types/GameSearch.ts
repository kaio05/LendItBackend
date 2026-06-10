import { GameCategories } from "@/infra/data/generated/prisma/enums"

export type GameSearch = {
    name: string | undefined,
    category: GameCategories | undefined,
    minPlayers: number | undefined,
    maxPlayers: number | undefined,
    minAge: number | undefined
}