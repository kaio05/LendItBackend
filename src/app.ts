import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from './infra/middlewares/errorHandler';
import userRoutes from "./infra/http/routes/userRoutes";
import gameRoutes from './infra/http/routes/gameRoutes';
import chatRoute from "./infra/http/routes/chatRoutes";
import messageRoute from "./infra/http/routes/messageRoutes";
import loanRoutes from "./infra/http/routes/loanRoutes";
import fineRoute from "./infra/http/routes/fineRoutes";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));
app.use("/uploads/game_images", express.static("uploads/game_images"));
app.use("/uploads/user_images", express.static("uploads/user_images"));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/chat", chatRoute);
app.use("/api/messages", messageRoute);
app.use("/api/loan", loanRoutes);
app.use("/api/fine", fineRoute);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;