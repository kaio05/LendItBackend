import { Router } from "express";
import { loanController } from "../controllers/loanController";
import { verifyAccessToken } from "../../middlewares/verifyJWT";

const loanRoutes = Router();
const controller: loanController = new loanController();

loanRoutes.use(verifyAccessToken);

loanRoutes.post("/", controller.create);

loanRoutes.get("/unique/:id", controller.getUnique);
loanRoutes.get("/me", controller.getAll);
loanRoutes.get("/status", controller.getByStatus);

loanRoutes.patch("/:id", controller.updateDate);
loanRoutes.patch("/accept/:id", controller.accept);
loanRoutes.patch("/cancel/:id", controller.cancel);
loanRoutes.patch("/startReturn/:id", controller.startReturn);
loanRoutes.patch("/confirmOverdue/:id", controller.confirmOverdue);
loanRoutes.patch("/confirmReturn/:id", controller.confirmReturn);

loanRoutes.delete("/:id", controller.delete);

export default loanRoutes;