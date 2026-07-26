// filepath: src/config/env.config.js
// Validates and exports environment variables.
import dotenv from 'dotenv';
dotenv.config();

export const ENV = Object.freeze({
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/crm_enterprise_db',
  JWT: {
    ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'fallback_access_secret',
    ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY || '1d',
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret',
    REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY || '7d',
  },
  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    API_KEY: process.env.CLOUDINARY_API_KEY,
    API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },
  SMTP: {
    HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
    PORT: Number(process.env.SMTP_PORT) || 587,
    USER: process.env.SMTP_USER,
    PASS: process.env.SMTP_PASS,
    FROM_EMAIL: process.env.SMTP_FROM_EMAIL || 'noreply@acmecrm.com',
  },
});
