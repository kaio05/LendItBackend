import { IgameRepository } from "@/domain/Irepositories/IgameRepository";
import { GameSearch } from "@/domain/types/GameSearch";
import { gameDTO } from "../dtos/gameDTO";
import { prisma } from "@/infra/data/lib/prisma";

export class GameRepository implements IgameRepository
{
    async save(game: gameDTO): Promise<gameDTO> {
        const newGame: gameDTO = await prisma.game.create({
            data: {
                userId: game.userId!,
                code: game.code,
                name: game.name!,
                category: game.category!,
                description: game.description!,
                minPlayers: game.minPlayers!,
                maxPlayers: game.maxPlayers!,
                minAge: game.minAge!,
                imagePath: game.imagePath
            }
        }) as gameDTO;

        return newGame
    }

    async update(game: gameDTO): Promise<gameDTO> {
        const updated: gameDTO = await prisma.game.update({
            where: {id: game.id},
            data: {...game}
        }) as gameDTO;

        return updated
    }

    async delete(game: gameDTO): Promise<void> {
        await prisma.game.delete({where: {code: game.code}})
    }

    async findByCode(game: gameDTO): Promise<gameDTO | null> {
        const foundGame: gameDTO | null = await prisma.game.findUnique({
            where: {
                code: game.code
            }
        }) as gameDTO;

        return foundGame
    }

    async getAll(id: string): Promise<gameDTO[] | []> {
        return await prisma.game.findMany({
            where: {
                userId: id
            }
        }) as gameDTO[];
    }

    async getByCode(code: string): Promise<gameDTO | null> {
        return await prisma.game.findUnique({
            where: {
                code: code
            }
        }) as gameDTO;
    }

    async find(filters: GameSearch): Promise<gameDTO[] | []> {
        const { name, category, maxPlayers, minPlayers, minAge } = filters;
        return await prisma.game.findMany({
            where: {
                name: name !== undefined ? { startsWith: name, mode: 'insensitive' } : undefined,
                category: category,
                maxPlayers: { gte: minPlayers },
                minPlayers: { lte: maxPlayers },
                minAge: { lte: minAge }
            }
        }) as gameDTO[];
    }
}