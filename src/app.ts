import express from 'express';
import cookieParser from "cookie-parser";
import userRoutes from "./infra/http/routes/userRoutes";
import { errorHandler } from './infra/middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(cookieParser())

// Routes
app.use("/api/user", userRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;