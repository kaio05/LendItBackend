import { gameDTO } from "../../infra/data/dto/gameDTO";
import { Game } from "../entities/game";

export interface IgameRepository
{
    save(game: Game): Promise<gameDTO>;
    findByCode(game: Game): Promise<gameDTO | null>;
    getAll(): Promise<gameDTO[] | []>
}