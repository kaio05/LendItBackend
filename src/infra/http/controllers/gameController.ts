import { NextFunction, Request, Response } from "express";
import { gameService } from "../../../app/services/gameService";
import { Game } from "../../../domain/entities/game";
import { gameRep } from "../../../app/repositories/gameRepository";

const service = new gameService(new gameRep())

export const createGame = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body
        const game = service.create(new Game(body.userId, body.code, body.name, body.category, body.description))
        res.status(201).json({message: "created"})
    } catch (error) {
        next(error)
    }
}

export const getAllGames = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const gameList = await service.getAll()
        res.status(200).json({data: gameList})
    } catch (error) {
        next(error)
    }
}