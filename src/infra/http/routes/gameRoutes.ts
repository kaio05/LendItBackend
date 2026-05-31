import { Router } from "express";
import { GameController } from "../controllers/gameController";
import { verifyAccessToken } from "../../middlewares/verifyJWT";

const gameRoute = Router();
const controller: GameController = new GameController();

gameRoute.get("/", controller.search);
gameRoute.get("/view/:code", controller.getByCode);
gameRoute.use(verifyAccessToken);
gameRoute.post("/", controller.create);
gameRoute.get("/myGames", controller.getMine);
gameRoute.patch("/", controller.update);
gameRoute.delete("/:code", controller.delete);
export default gameRoute