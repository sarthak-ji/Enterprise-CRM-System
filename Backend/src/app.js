// filepath: src/app.js
// Express application setup, global middleware registration, and routes mounting.
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { ENV } from './config/env.config.js';
import { errorHandler } from './middleware/error.middleware.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { logger } from './utils/logger.js';
import { ApiResponse } from './utils/ApiResponse.js';

const app = express();

// CORS configuration
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Body Parsers & Cookie Parser
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

// Morgan HTTP logger integration with Winston
app.use(
  morgan('dev', {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  })
);

// Apply rate limiting to API routes
app.use('/api', apiLimiter);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json(new ApiResponse(200, { status: 'UP', timestamp: new Date() }, 'CRM API is healthy'));
});

// Centralized API Route Placeholders (will mount modules in next steps)
app.use('/api/v1', (req, res, next) => {
  if (req.path === '/') {
    return res.status(200).json(new ApiResponse(200, { version: 'v1.0.0' }, 'Enterprise CRM API v1'));
  }
  next();
});

// Global Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
