import { gameDTO } from "../../infra/data/dto/gameDTO";
import { Game } from "../entities/game";

export interface IgameRepository
{
    save(game: gameDTO): Promise<gameDTO>;
    findByCode(game: gameDTO): Promise<gameDTO | null>;
    update(game: gameDTO): Promise<gameDTO | null>;
    getAll(): Promise<gameDTO[] | []>;
}