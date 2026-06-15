import { Router } from "express";
import FineController from "../controllers/fineController";
import { verifyAccessToken } from "../../middlewares/verifyJWT";

const fineRoute = Router();
const controller = new FineController();

fineRoute.use(verifyAccessToken);

fineRoute.get("/me", controller.getMine);
fineRoute.get("/unique/:id", controller.getUnique);
fineRoute.delete("/pay/:id", controller.payFine);

export default fineRoute