import { Router } from "express";
import { MessageController } from "../controllers/messageController";

const messageRoute = Router();
const controller: MessageController = new MessageController();

messageRoute.post("/", controller.create);
messageRoute.get("/:chatId", controller.getMessages);

export default messageRoute;