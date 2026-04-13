import { Game } from "../../domain/entities/game";
import { User } from "../../domain/entities/user";
import { IgameRepository } from "../../domain/Irepositories/IgameRepository";
import { gameDTO } from "../../infra/data/dto/gameDTO";

export class GameService
{
    private repository: IgameRepository;

    constructor(gameRep: IgameRepository) {
        this.repository = gameRep;
    }

    async create(game: gameDTO): Promise<gameDTO> {
        const found: gameDTO | null = await this.repository.findByCode(game);

        if (found) throw new Error("Jogo já cadastrado");

        const saved: gameDTO = await this.repository.save(game);

        return saved;
    }

    async update(game: gameDTO): Promise<gameDTO | null> {

        const found: gameDTO | null = await this.repository.findByCode(game);

        if (!found) throw new Error("Jogo não cadastrado");

        const toUpdate: gameDTO = {
            id: found.id,
            userId: found.userId,
            code: found.code,
            name: game.name || found.name,
            category: game.category || found.category,
            description: game.description || found.description,
            available: game.available || found.available
        }

        const updated: gameDTO | null = await this.repository.update(toUpdate);

        return updated;
    }

    async delete(game: gameDTO): Promise<void> {
        const found: gameDTO | null = await this.repository.findByCode(game);

        if (!found) throw new Error("Jogo não cadastrado");

        await this.repository.delete(game);

        return;
    }

    async getAll(): Promise<gameDTO[] | []> {
        return await this.repository.getAll();
    }
}