// filepath: src/config/cloudinary.config.js
// Cloudinary SDK configuration for file/image uploads.
import { v2 as cloudinary } from 'cloudinary';
import { ENV } from './env.config.js';

cloudinary.config({
  cloud_name: ENV.CLOUDINARY.CLOUD_NAME,
  api_key: ENV.CLOUDINARY.API_KEY,
  api_secret: ENV.CLOUDINARY.API_SECRET,
});

export default cloudinary;
