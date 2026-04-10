import { Game } from "../../domain/entities/game";
import { IgameRepository } from "../../domain/Irepositories/IgameRepository";
import { gameDTO } from "../../infra/data/dto/gameDTO";
import { prisma } from "../../infra/data/lib/prisma";

export class gameRep implements IgameRepository
{
    async save(game: Game): Promise<gameDTO> {
        const newGame: gameDTO = await prisma.game.create({
            data: {
                userId: game.getUserId(),
                code: game.getCode(),
                name: game.getName(),
                category: game.getCategory(),
                description: game.getDescription(),
                available: game.getAvailable(),
            }
        })

        return newGame
    }

    async findByCode(game: Game): Promise<gameDTO | null> {
        const foundGame: gameDTO | null = await prisma.game.findUnique({
            where: {
                code: game.getCode()
            }
        })

        return foundGame
    }

    async getAll(): Promise<gameDTO[] | []> {
        return await prisma.game.findMany()
    }
}