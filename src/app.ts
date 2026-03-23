import express from 'express';
import 'reflect-metadata';
import { errorHandler } from './infra/middlewares/errorHandler';

const app = express();

app.use(express.json());

app.use(errorHandler);

export default app;
