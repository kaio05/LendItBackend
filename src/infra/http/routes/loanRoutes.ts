import { Router } from "express";
import { loanController } from "../controllers/loanController";
import { verifyAccessToken } from "../../middlewares/verifyJWT";

const loanRoutes = Router();
const controller: loanController = new loanController();

loanRoutes.use(verifyAccessToken);

loanRoutes.post("/", controller.create);

loanRoutes.get("/:id", controller.getUnique);
loanRoutes.get("/me", controller.getAll);
loanRoutes.get("/status", controller.getByStatus);

loanRoutes.patch("/:id", controller.updateDate);
loanRoutes.put("/accept/:id", controller.accept);
loanRoutes.put("/cancel/:id", controller.cancel);
loanRoutes.put("/startReturn/:id", controller.startReturn);
loanRoutes.put("/confirmOverdue/:id", controller.confirmOverdue);
loanRoutes.put("/confirmReturn/:id", controller.confirmReturn);

loanRoutes.delete("/:id", controller.delete);

export default loanRoutes;