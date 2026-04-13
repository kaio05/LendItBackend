import { NextFunction, Request, Response } from "express";
import { GameService } from "../../../app/services/gameService";
import { Game } from "../../../domain/entities/game";
import { GameRepository } from "../../../app/repositories/gameRepository";
import { gameDTO } from "../../data/dto/gameDTO";

export class GameController {
    private service: GameService = new GameService(
        new GameRepository()
    )

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body
            const newGame: gameDTO = {...body}
            const created = await this.service.create(newGame)
            res.status(201).json({message: "created"})
        } catch (error) {
            next(error)
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body
            const toUpdate: gameDTO = {...body}
            const updated = await this.service.update(toUpdate)
            res.status(204).json({message: "updated"})
        } catch (error) {
            next(error)
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body
            const toDelete: gameDTO = body
            const updated = await this.service.delete(toDelete)
            res.status(204).json({message: "deleted"})
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