// filepath: src/models/Customer.model.js
// Customer schema — account profile, LTV tracking, tier, and interaction notes.

import mongoose from 'mongoose';
import { CUSTOMER_STATUS, CUSTOMER_TIER } from '../constants/status.constant.js';

const noteSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Contact name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Customer email is required'],
      lowercase: true,
      trim: true,
    },
    phone: { type: String, trim: true, default: '' },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: Object.values(CUSTOMER_STATUS),
      default: CUSTOMER_STATUS.ACTIVE,
    },
    tier: {
      type: String,
      enum: Object.values(CUSTOMER_TIER),
      default: CUSTOMER_TIER.STARTER,
    },
    totalSpent: { type: Number, default: 0 },
    activeDeals: { type: Number, default: 0 },
    notes: [noteSchema],
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

customerSchema.index({ name: 'text', email: 'text', company: 'text' });

export default mongoose.model('Customer', customerSchema);
