import app from './app';
import { env } from './config/env';
import { prisma } from './config/db';

const PORT = env.PORT || 3000;

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('📦 Connected to Database');

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

startServer();

// Handle unexpected errors (e.g., uncaught exceptions)
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});
