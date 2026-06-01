import { gameDTO } from "../../app/dtos/gameDTO";
import { GameSearch } from "../types/GameSearch";

export interface IgameRepository
{
    save(game: gameDTO): Promise<gameDTO>;
    findByCode(game: gameDTO): Promise<gameDTO | null>;
    update(game: gameDTO): Promise<gameDTO | null>;
    delete(game: gameDTO): Promise<void>
    getAll(id: string): Promise<gameDTO[] | []>;
    getByCode(code: string): Promise<gameDTO | null>
    find(params: GameSearch): Promise<gameDTO[] | []>;
}