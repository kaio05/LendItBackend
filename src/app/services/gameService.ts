import { IgameRepository } from "@/domain/Irepositories/IgameRepository";
import { IuserRepository } from "@/domain/Irepositories/IuserRepository";
import IFileStorage from "@/domain/Iutils/IFileStorage";
import { Ijwt } from "@/domain/Iutils/Ijwt";
import { GameSearch } from "@/domain/types/GameSearch";
import { gameDTO } from "../dtos/gameDTO";

export class GameService
{
    private repository: IgameRepository;
    private userRepository: IuserRepository;
    private jwtHelp: Ijwt;
    private fs: IFileStorage;
    private imagesDir: string = "uploads/game_images";

    constructor(gameRep: IgameRepository, userRep: IuserRepository, jwtHelp: Ijwt, fs: IFileStorage) {
        this.repository = gameRep;
        this.userRepository = userRep;
        this.jwtHelp = jwtHelp;
        this.fs = fs;
    }

    async create(token: string, game: gameDTO): Promise<gameDTO> {
        try {
            const decoded = this.jwtHelp.decodeAccessToken(token);
            
            const userExists = await this.userRepository.findById(decoded.id);
            if (!userExists) {
                throw new Error("Erro interno.");
            }

            const found: gameDTO | null = await this.repository.getByName(game, decoded.id);

            if (found) throw new Error("Jogo já cadastrado");

            if (game.imagePath) {
                this.fs.changeDir(game.imagePath, this.imagesDir);
            }

            game.userId = decoded.id;
            const saved: gameDTO = await this.repository.save(game);

            return saved;
        } catch (error) {
            if (game.imagePath) {
                this.fs.delete(game.imagePath);
            }
            throw error;
        }
    }

    async update(token: string, game: gameDTO): Promise<gameDTO | null> {
        try {
            const found: gameDTO | null = await this.repository.findByCode(game);

            if (!found) throw new Error("Jogo não cadastrado");

            const decoded = this.jwtHelp.decodeAccessToken(token);

            if (found.userId != decoded.id) throw new Error("Usuário incorreto");

            let newImagePath = found.imagePath;
            if (game.imagePath) {
                newImagePath = game.imagePath;
                this.fs.changeDir(game.imagePath, this.imagesDir);
            }
            if (found.imagePath) {
                this.fs.delete(found.imagePath);
            }

            if (game.minPlayers && !isNaN(Number(game.minPlayers))) {
                game.minPlayers = Number(game.minPlayers);
            }

            if (game.maxPlayers && !isNaN(Number(game.maxPlayers))) {
                game.maxPlayers = Number(game.maxPlayers);
            }

            if (game.minAge && !isNaN(Number(game.minAge))) {
                game.minAge = Number(game.minAge);
            }

            const toUpdate: gameDTO = {
                id: found.id,
                userId: found.userId,
                code: found.code,
                name: game.name || found.name,
                category: game.category || found.category,
                description: game.description || found.description,
                minPlayers: game.minPlayers ?? found.minPlayers,
                maxPlayers: game.maxPlayers ?? found.maxPlayers,
                minAge: game.minAge ?? found.minAge,
                imagePath: newImagePath
            }

            const updated: gameDTO | null = await this.repository.update(toUpdate);

            return updated;
        } catch (error) {
            if (game.imagePath) {
                this.fs.delete(game.imagePath);
            }
            throw error;
        }
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

    async getByCode(code: number): Promise<gameDTO | null> {
        return await this.repository.getByCode(code);
    }

    async getUsername(userId: string | undefined): Promise<string | null> {
        if (!userId) return null;
        return await this.repository.getUsername(userId);
    }

    async getDates(id: string | undefined): Promise<{from: Date, To: Date}[] | {}[]> {
        if (!id) return [];
        return await this.repository.getDates(id);
    }

    async find(filters: GameSearch): Promise<gameDTO[] | []> {
        let { name, category, minPlayers, maxPlayers, minAge } = filters;

        if (minPlayers && !isNaN(Number(minPlayers))) {
            minPlayers = Number(minPlayers);
        }

        if (maxPlayers && !isNaN(Number(maxPlayers))) {
            maxPlayers = Number(maxPlayers);
        }

        if (minAge && !isNaN(Number(minAge))) {
            minAge = Number(minAge);
        }

        return await this.repository.find({
            name,
            category,
            minPlayers,
            maxPlayers,
            minAge
        });
    }
}