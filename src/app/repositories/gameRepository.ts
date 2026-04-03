import { Game } from "../../domain/entities/game";
import { User } from "../../domain/entities/user";
import { IgameRepository } from "../../domain/Irepositories/IgameRepository";
import { prisma } from "../../infra/data/lib/prisma";

export class gameRep implements IgameRepository
{
    async save(game: Game): Promise<void> {
        await prisma.game.create({
            data: {
                userId: game.getUser().getId(),
                code: game.getCode(),
                name: game.getName(),
                category: game.getCategory(),
                description: game.getDescription(),
                available: game.getAvailable(),
            }
        })
    }

    async findByCode(game: Game): Promise<Game | void> {
        const foundGame = await prisma.game.findUnique({
            where: {
                code: game.getCode()
            }
        })

        const foundGameUser = await prisma.user.findUnique({
            where: {
                email: game.getUser().getEmail()
            }
        })

        if (foundGame && foundGameUser) {
            return new Game(new User(foundGameUser!.id, foundGameUser!.username, foundGameUser!.email, foundGameUser?.password), foundGame.code, foundGame.name, foundGame.category, foundGame.description, foundGame.available)
        }
    }
}