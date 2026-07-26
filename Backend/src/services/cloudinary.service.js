// filepath: src/services/cloudinary.service.js
// Cloudinary upload and deletion service for avatar and document management.

import cloudinary from '../config/cloudinary.config.js';
import fs from 'fs';
import { logger } from '../utils/logger.js';

export const uploadToCloudinary = async (localFilePath, folder = 'crm-avatars') => {
  if (!localFilePath) return null;

  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder,
      resource_type: 'auto',
      transformation: [{ width: 400, height: 400, crop: 'limit', quality: 'auto' }],
    });

    // Remove local temp file after successful upload
    fs.unlinkSync(localFilePath);

    return {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (error) {
    // Clean up local file even on failure
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    logger.error(`Cloudinary upload failed: ${error.message}`);
    throw error;
  }
};

export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return null;

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    logger.error(`Cloudinary deletion failed: ${error.message}`);
    throw error;
  }
};
