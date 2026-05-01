import { NextFunction, Request, Response } from "express";
import { GameService } from "../../../app/services/gameService";
import { GameRepository } from "../../../app/repositories/gameRepository";
import { gameDTO } from "../../../app/DTOs/gameDTO";
import { jwtHelp } from "../../../app/utils/jwtHelp";
import { userRepository } from "../../../app/repositories/userRepository";

export class GameController {
    private service: GameService = new GameService(
        new GameRepository(),
        new userRepository(), 
        new jwtHelp()
    )

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers['authorization']!.split(' ')[1];
            const body = req.body
            const newGame: gameDTO = {...body}
            newGame.userId
            const created = await this.service.create(token, newGame)
            res.status(201).json({message: "created"})
        } catch (error) {
            next(error)
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers['authorization']!.split(' ')[1];
            const body = req.body
            const toUpdate: gameDTO = {...body}
            const updated = await this.service.update(token, toUpdate)
            res.status(204).json({message: "updated"})
        } catch (error) {
            next(error)
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers['authorization']!.split(' ')[1];
            const body = req.body
            const toDelete: gameDTO = body
            const updated = await this.service.delete(token, toDelete)
            res.status(204).json({message: "deleted"})
        } catch (error) {
            next(error)
        }
    }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers['authorization']!.split(' ')[1];
            const gameList = await this.service.getAll(token)
            res.status(200).json({data: gameList})
        } catch (error) {
            next(error)
        }
    }
}