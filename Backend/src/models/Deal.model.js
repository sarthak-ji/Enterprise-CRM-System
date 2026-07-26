// filepath: src/models/Deal.model.js
// Deal schema — sales pipeline deals with stage, value, probability, and expected close date.

import mongoose from 'mongoose';
import { PIPELINE_STAGE, LEAD_PRIORITY } from '../constants/status.constant.js';

const dealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Deal title is required'],
      trim: true,
    },
    company: { type: String, trim: true, default: '' },
    contactName: { type: String, trim: true, default: '' },
    contactEmail: { type: String, lowercase: true, trim: true, default: '' },
    value: { type: Number, required: [true, 'Deal value is required'], default: 0 },
    stage: {
      type: String,
      enum: Object.values(PIPELINE_STAGE),
      default: PIPELINE_STAGE.NEW,
    },
    priority: {
      type: String,
      enum: Object.values(LEAD_PRIORITY),
      default: LEAD_PRIORITY.MEDIUM,
    },
    probability: { type: String, default: '50%' },
    expectedCloseDate: { type: Date },
    notes: { type: String, default: '' },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
    },
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lead',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

dealSchema.index({ title: 'text', company: 'text' });

export default mongoose.model('Deal', dealSchema);
