// filepath: src/config/db.config.js
// MongoDB Mongoose connection setup with connection pooling and error logging.
import mongoose from 'mongoose';
import { ENV } from './env.config.js';
import { logger } from '../utils/logger.js';

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(ENV.MONGODB_URI, {
      maxPoolSize: 10,
    });
    logger.info(
      `MongoDB connected successfully! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    logger.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};
