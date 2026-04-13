import { NextFunction, Request, Response } from "express";
import { GameService } from "../../../app/services/gameService";
import { Game } from "../../../domain/entities/game";
import { GameRepository } from "../../../app/repositories/gameRepository";

export class GameController {
    private service: GameService = new GameService(
        new GameRepository()
    )

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body
            const game = await this.service.create(new Game(body.userId, body.code, body.name, body.category, body.description))
            res.status(201).json({message: "created"})
        } catch (error) {
            next(error)
        }
    }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const gameList = await this.service.getAll()
            res.status(200).json({data: gameList})
        } catch (error) {
            next(error)
        }
    }
}