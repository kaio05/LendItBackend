import { Router } from "express";
import { GameController } from "../controllers/gameController";

const gameRoute = Router();
const controller: GameController = new GameController();

gameRoute.post("/", controller.create);
gameRoute.get("/", controller.getAll);
gameRoute.patch("/", controller.update);

export default gameRoute