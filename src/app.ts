import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { schedule } from "node-cron";
import { errorHandler } from './infra/middlewares/errorHandler';
import userRoutes from "./infra/http/routes/userRoutes";
import gameRoutes from './infra/http/routes/gameRoutes';
import chatRoute from "./infra/http/routes/chatRoutes";
import messageRoute from "./infra/http/routes/messageRoutes";
import loanRoutes from "./infra/http/routes/loanRoutes";
import StartLoans from "./infra/works/StartLoans";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));
// Routes
app.use("/api/user", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/chat", chatRoute);
app.use("/api/messages", messageRoute);
app.use("/api/loan", loanRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

if (process.env.CRON_WORK === "true") {
    schedule("0 10 * * *", StartLoans);     // Every day at 10am
}

export default app;