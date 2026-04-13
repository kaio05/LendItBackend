import express from 'express';
// import itemRoutes from './infra/routes/itemRoutes';
import { errorHandler } from './infra/middlewares/errorHandler';
import  userRoutes from "./infra/http/routes/userRoutes";
import gameRoutes from './infra/http/routes/gameRoutes';

const app = express();

app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/games", gameRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;