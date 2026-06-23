import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes';
import todoRoutes from './routes/todo.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/todos', todoRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Global Error Handler
app.use(errorHandler);

export default app;
