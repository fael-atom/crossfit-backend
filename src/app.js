import express from 'express';
import clientRouter from './routes/clientRoutes.js';

export const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/clients', clientRouter);