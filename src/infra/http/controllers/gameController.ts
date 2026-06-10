import { NextFunction, Request, Response } from "express";
import { GameService } from "@/app/services/gameService";
import { GameRepository } from "@/app/repositories/gameRepository";
import { gameDTO } from "@/app/dtos/gameDTO";
import { jwtHelp } from "@/app/utils/jwtHelp";
import { userRepository } from "@/app/repositories/userRepository";
import FileStorage from "@/app/utils/FileStorage";
import { GameSearch } from "@/domain/types/GameSearch";
import { createGameSchema } from "@/infra/schemas/gameSchema";

export class GameController {
    private service: GameService = new GameService(
        new GameRepository(),
        new userRepository(), 
        new jwtHelp(),
        new FileStorage()
    )

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers['authorization']!.split(' ')[1];
            const parseData = createGameSchema.safeParse(req.body);
            if (!parseData.success) throw new Error("Invalid Game Format.");
            const newGame: gameDTO = {...parseData.data};
            await this.service.create(token, newGame);
            res.status(201).json({message: "created"})
        } catch (error) {
            next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers['authorization']!.split(' ')[1];
            const body = req.body;
            const imagePath = req.file?.path.replace(/\\/g, "/");
            const toUpdate: gameDTO = {...body, imagePath};
            await this.service.update(token, toUpdate);
            res.status(204).json({message: "updated"});
        } catch (error) {
            next(error);
        }
    }

    delete = async (req: Request<{code: string}>, res: Response, next: NextFunction) => {
        try {
            const token = req.headers['authorization']!.split(' ')[1];
            const gameCode = req.params.code;
            const toDelete: gameDTO = {code: gameCode};
            await this.service.delete(token, toDelete);
            res.status(204).json({message: "deleted"});
        } catch (error) {
            next(error);
        }
    }

    getMine = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers['authorization']!.split(' ')[1];
            const gameList = await this.service.getAll(token);
            res.status(200).json({data: gameList});
        } catch (error) {
            next(error);
        }
    }

    getByCode = async (req: Request<{code: string}>, res: Response, next: NextFunction) => {
        try {
            const gameCode = req.params.code;
            const game = await this.service.getByCode(gameCode);
            res.status(200).json({data: game});
        } catch (error) {
            next(error);
        }
    }

    search = async (req: Request<{}, {}, {}, GameSearch>, res: Response, next: NextFunction) => {
        try {
            const filters = req.query;
            const gameList = await this.service.find(filters);
            res.status(200).json({data: gameList})
        } catch (error) {
            next(error)
        }
    }
}