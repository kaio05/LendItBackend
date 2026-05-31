import { IgameRepository } from "@/domain/Irepositories/IgameRepository";
import { IuserRepository } from "@/domain/Irepositories/IuserRepository";
import { Ijwt } from "@/domain/Iutils/Ijwt";
import { GameSearch } from "@/domain/types/GameSearch";
import { gameDTO } from "../dtos/gameDTO";

export class GameService
{
    private repository: IgameRepository;
    private userRepository: IuserRepository;
    private jwtHelp: Ijwt;

    constructor(gameRep: IgameRepository, userRep: IuserRepository, jwtHelp: Ijwt) {
        this.repository = gameRep;
        this.userRepository = userRep;
        this.jwtHelp = jwtHelp;
    }

    async create(token: string, game: gameDTO): Promise<gameDTO> {
        const decoded = this.jwtHelp.decodeAccessToken(token);
        
        const userExists = await this.userRepository.findById(decoded.id);
        if (!userExists) {
            throw new Error("Erro interno.");
        }

        const found: gameDTO | null = await this.repository.findByCode(game);

        if (found) throw new Error("Jogo já cadastrado");

        game.userId = decoded.id;
        const saved: gameDTO = await this.repository.save(game);

        return saved;
    }

    async update(token: string, game: gameDTO): Promise<gameDTO | null> {

        const found: gameDTO | null = await this.repository.findByCode(game);

        if (!found) throw new Error("Jogo não cadastrado");

        const decoded = this.jwtHelp.decodeAccessToken(token);

        if (found.userId != decoded.id) throw new Error("Usuário incorreto")

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

    async delete(token: string, game: gameDTO): Promise<void> {
        const found: gameDTO | null = await this.repository.findByCode(game);

        if (!found) throw new Error("Jogo não cadastrado");

        const decoded = this.jwtHelp.decodeAccessToken(token);

        if (found.userId != decoded.id) throw new Error("Usuário incorreto")

        await this.repository.delete(game);

        return;
    }

    async getAll(token: string): Promise<gameDTO[] | []> {
        const decoded = this.jwtHelp.decodeAccessToken(token);
        return await this.repository.getAll(decoded.id);
    }

    async find(params: GameSearch): Promise<gameDTO[] | []> {
        return await this.repository.find(params);
    }
}