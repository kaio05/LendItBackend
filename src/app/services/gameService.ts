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

    async create(game: Game): Promise<gameDTO> {
        const found: gameDTO | null = await this.repository.findByCode(game);

        if (found) throw new Error("Jogo já cadastrado");

        const saved: gameDTO = await this.repository.save(game);

        return saved;
    }

    async getAll(): Promise<gameDTO[] | []> {
        return await this.repository.getAll();
    }
}