import { Router } from "express";
import { userController } from "../controllers/userController";

const userRoute = Router();
const controller: userController = new userController()

userRoute.post("/", controller.create);
userRoute.get("/me", controller.find);
userRoute.put("/", controller.update);
userRoute.delete("/me", controller.delete);
userRoute.post("/login", controller.login);
userRoute.post("/logout", controller.logout);

export default userRoute;