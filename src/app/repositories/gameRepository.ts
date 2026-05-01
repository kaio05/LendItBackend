import { IgameRepository } from "../../domain/Irepositories/IgameRepository";
import { gameDTO } from "../DTOs/gameDTO";
import { prisma } from "../../infra/data/lib/prisma";

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
                available: true,
            }
        })

        return newGame
    }

    async update(game: gameDTO): Promise<gameDTO> {
        const updated: gameDTO = await prisma.game.update({
            where: {id: game.id},
            data: {...game}
        })

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
        })

        return foundGame
    }

    async getAll(id: string): Promise<gameDTO[] | []> {
        return await prisma.game.findMany({
            where: {
                userId: id
            }
        })
    }
}