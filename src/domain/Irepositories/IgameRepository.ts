import { gameDTO } from "../../app/DTOs/gameDTO";

export interface IgameRepository
{
    save(game: gameDTO): Promise<gameDTO>;
    findByCode(game: gameDTO): Promise<gameDTO | null>;
    update(game: gameDTO): Promise<gameDTO | null>;
    delete(game: gameDTO): Promise<void>
    getAll(id: string): Promise<gameDTO[] | []>;
}