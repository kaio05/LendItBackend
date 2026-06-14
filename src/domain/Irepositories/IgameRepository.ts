import { gameDTO } from "@/app/dtos/gameDTO";
import { GameSearch } from "../types/GameSearch";

export interface IgameRepository
{
    save(game: gameDTO): Promise<gameDTO>;
    findByCode(game: gameDTO): Promise<gameDTO | null>;
    update(game: gameDTO): Promise<gameDTO | null>;
    delete(game: gameDTO): Promise<void>
    getAll(id: string): Promise<gameDTO[] | []>;
    getByCode(code: number): Promise<gameDTO | null>;
    getByName(game: gameDTO, userId: string): Promise<gameDTO | null>;
    getUsername(userId: string): Promise<string | null>;
    getDates(id: string): Promise<{from: Date, To: Date}[] | {}[]>;
    find(filters: GameSearch): Promise<gameDTO[] | []>;
}