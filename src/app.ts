import express from 'express';
// import itemRoutes from './infra/routes/itemRoutes';
import { errorHandler } from './infra/middlewares/errorHandler';
import  userRoutes from "./infra/http/routes/userRoutes";

const app = express();

app.use(express.json());

// Routes
app.use("/api/user", userRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;