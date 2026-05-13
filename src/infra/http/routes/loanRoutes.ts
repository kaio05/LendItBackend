import { Router } from "express";
import { loanController } from "../controllers/loanController";
import { verifyAccessToken } from "../../middlewares/verifyJWT";

const loanRoutes = Router();
const controller: loanController = new loanController();

loanRoutes.use(verifyAccessToken);
loanRoutes.post("/", controller.createLoan);
loanRoutes.get("/:id", controller.getLoan);
loanRoutes.get("/me", controller.getAllLoans);
loanRoutes.put("/:id", controller.updateLoan);
loanRoutes.delete("/:id", controller.delete);

export default loanRoutes;