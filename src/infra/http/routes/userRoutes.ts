import { Router } from "express";
import { userController } from "../controllers/userController";
import { verifyAccessToken } from "../../middlewares/verifyJWT";
import { upload } from "../../middlewares/upload";

const userRoute = Router();
const controller: userController = new userController()

userRoute.post("/", controller.create);
userRoute.post("/login", controller.login);
userRoute.post("/refresh", controller.refresh);

userRoute.use(verifyAccessToken);
userRoute.get("/me", controller.find);
userRoute.put("/", upload.single("image"), controller.update);
userRoute.delete("/me", controller.delete);
userRoute.post("/logout", controller.logout);

export default userRoute;