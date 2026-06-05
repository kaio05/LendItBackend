import { Router } from "express";
import { GameController } from "../controllers/gameController";
import { verifyAccessToken } from "../../middlewares/verifyJWT";
import upload from "@/infra/middlewares/upload";

const gameRoute = Router();
const controller: GameController = new GameController();

gameRoute.get("/", controller.search);
gameRoute.get("/view/:code", controller.getByCode);
gameRoute.use(verifyAccessToken);
gameRoute.post("/", controller.create);
gameRoute.get("/myGames", controller.getMine);
gameRoute.patch("/", upload.single("image"), controller.update);
gameRoute.delete("/:code", controller.delete);
export default gameRoute