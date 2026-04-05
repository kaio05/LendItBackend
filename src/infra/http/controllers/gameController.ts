import { NextFunction, Request, Response } from "express";
import { gameService } from "../../../app/services/gameService";
import { Game } from "../../../domain/entities/game";
import { User } from "../../../domain/entities/user";
import { gameDTO } from "../../data/dto/gameDTO";
import { gameRep } from "../../../app/repositories/gameRepository";

export const createGame = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body
        const game = await new gameService(new gameRep()).create(new Game(body.userId, body.code, body.name, body.category, body.description))
        res.status(201).json({message: "created"})
    } catch (error) {
        next(error)
    }
}