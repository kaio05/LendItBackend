import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from './infra/middlewares/errorHandler';
import userRoutes from "./infra/http/routes/userRoutes";
import gameRoutes from './infra/http/routes/gameRoutes';

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("upload"));
// Routes
app.use("/api/user", userRoutes);
app.use("/api/games", gameRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;