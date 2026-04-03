import { Game } from "../../domain/entities/game";
import { User } from "../../domain/entities/user";
import { IgameRepository } from "../../domain/Irepositories/IgameRepository";

export class gameService
{
    private gameRep: IgameRepository;

    constructor(gameRep: IgameRepository) {
        this.gameRep = gameRep;
    }

    async create(game: Game): Promise<void> {
        const found = await this.gameRep.findByCode(game);

        if (found) throw new Error("Jogo já cadastrado");

        const saved = await this.gameRep.save(game);

        return saved;
    }
}