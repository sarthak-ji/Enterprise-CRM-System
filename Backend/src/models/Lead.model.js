// filepath: src/models/Lead.model.js
// Lead schema — inbound prospect tracking with status, priority, value, and ownership.

import mongoose from 'mongoose';
import { LEAD_STATUS, LEAD_PRIORITY } from '../constants/status.constant.js';

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Lead name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Lead email is required'],
      lowercase: true,
      trim: true,
    },
    phone: { type: String, trim: true, default: '' },
    company: { type: String, trim: true, default: '' },
    source: {
      type: String,
      enum: ['Website', 'Referral', 'Social Media', 'Email Campaign', 'Direct', 'Other'],
      default: 'Website',
    },
    status: {
      type: String,
      enum: Object.values(LEAD_STATUS),
      default: LEAD_STATUS.NEW,
    },
    priority: {
      type: String,
      enum: Object.values(LEAD_PRIORITY),
      default: LEAD_PRIORITY.MEDIUM,
    },
    value: { type: Number, default: 0 },
    notes: { type: String, default: '' },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

leadSchema.index({ name: 'text', email: 'text', company: 'text' });

export default mongoose.model('Lead', leadSchema);
