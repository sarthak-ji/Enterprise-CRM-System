// filepath: src/services/mail.service.js
// Nodemailer email dispatch service — password reset, welcome, and notification emails.

import { transporter } from '../config/mailer.config.js';
import { ENV } from '../config/env.config.js';
import { logger } from '../utils/logger.js';

export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${ENV.CLIENT_URL}/reset-password/${resetToken}`;

  const mailOptions = {
    from: `"Acme CRM" <${ENV.SMTP.FROM_EMAIL}>`,
    to: email,
    subject: 'Password Reset Request — Acme CRM',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6366f1;">Password Reset</h2>
        <p>You requested to reset your password. Click the button below to set a new password:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
          Reset Password
        </a>
        <p style="margin-top: 20px; color: #666;">This link will expire in <strong>30 minutes</strong>.</p>
        <p style="color: #999; font-size: 12px;">If you didn't request this, please ignore this email.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Password reset email sent to ${email}`);
  } catch (error) {
    logger.error(`Failed to send reset email to ${email}: ${error.message}`);
    throw error;
  }
};

export const sendWelcomeEmail = async (email, fullName) => {
  const mailOptions = {
    from: `"Acme CRM" <${ENV.SMTP.FROM_EMAIL}>`,
    to: email,
    subject: 'Welcome to Acme CRM!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #6366f1;">Welcome, ${fullName}!</h2>
        <p>Your account has been created successfully. You can now log in and start managing your sales pipeline.</p>
        <a href="${ENV.CLIENT_URL}/login" style="display: inline-block; padding: 12px 24px; background-color: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
          Log In to CRM
        </a>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Welcome email sent to ${email}`);
  } catch (error) {
    logger.error(`Failed to send welcome email to ${email}: ${error.message}`);
  }
};
