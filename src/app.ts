import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from './infra/middlewares/errorHandler';
import userRoutes from "./infra/http/routes/userRoutes";
import gameRoutes from './infra/http/routes/gameRoutes';
import loanRoutes from "./infra/http/routes/loanRoutes";

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
app.use("/api/loan", loanRoutes)

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;