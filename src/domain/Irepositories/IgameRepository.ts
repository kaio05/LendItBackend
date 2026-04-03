import { Game } from "../entities/game";

export interface IgameRepository
{
    save(game: Game): Promise<void>;
    findByCode(game: Game): Promise<Game | void>;
}