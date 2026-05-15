import { Router } from "express";
import { ChatController } from "../controllers/chatController";

const chatRoute = Router();
const controller: ChatController = new ChatController();

chatRoute.post("/", controller.create);
chatRoute.get("/:userId", controller.findUserChats);
chatRoute.get('/find/:firstId/:secondId', controller.findChat);

export default chatRoute;