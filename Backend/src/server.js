// filepath: src/server.js
// Server entry point — connects MongoDB, initializes HTTP server & Socket.io.
import http from 'http';
import app from './app.js';
import { connectDB } from './config/db.config.js';
import { ENV } from './config/env.config.js';
import { logger } from './utils/logger.js';

const server = http.createServer(app);

// Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
  logger.error(`UNCAUGHT EXCEPTION! Shutting down... ${err.name}: ${err.message}`);
  process.exit(1);
});

// Initialize DB and Listen to Port
connectDB().then(() => {
  server.listen(ENV.PORT, () => {
    logger.info(`Server running in ${ENV.NODE_ENV} mode on port ${ENV.PORT}`);
    logger.info(`API Base Endpoint: http://localhost:${ENV.PORT}/api/v1`);
  });
});

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
  logger.error(`UNHANDLED REJECTION! Shutting down... ${err.name}: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
