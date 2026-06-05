import { Router } from "express";
import FineController from "../controllers/fineController";
import { verifyAccessToken } from "../../middlewares/verifyJWT";

const fineRoute = Router();
const controller = new FineController();

fineRoute.use(verifyAccessToken);

fineRoute.get("/:id", controller.getUnique);
fineRoute.get("/me", controller.getMine);
fineRoute.delete("/pay/:id", controller.payFine);

export default fineRoute