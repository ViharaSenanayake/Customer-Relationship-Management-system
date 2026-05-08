import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth.routes';
import leadsRoutes from './routes/leads.routes';
import notesRoutes from './routes/notes.routes';
import dashboardRoutes from './routes/dashboard.routes';

const app = express();

//Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/leads/:id/notes', notesRoutes);
app.use('/api/dashboard', dashboardRoutes);

//Health check 
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

//Error handler 
app.use(errorHandler);

export default app;
