import { Router } from "express";
import { GameController } from "../controllers/gameController";
import { verifyAccessToken } from "../../middlewares/verifyJWT";

const gameRoute = Router();
const controller: GameController = new GameController();

gameRoute.use(verifyAccessToken);
gameRoute.post("/", controller.create);
gameRoute.get("/myGames", controller.getMine);
gameRoute.get("/", controller.search);
gameRoute.patch("/", controller.update);
gameRoute.delete("/", controller.delete);

export default gameRoute