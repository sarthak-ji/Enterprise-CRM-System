// filepath: src/models/ActivityLog.model.js
// ActivityLog schema — system audit trail tracking all CRM entity changes.

import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: ['created', 'updated', 'deleted', 'status_changed', 'stage_changed', 'note_added', 'login', 'logout'],
    },
    entityType: {
      type: String,
      required: true,
      enum: ['lead', 'customer', 'deal', 'task', 'user'],
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    description: { type: String, default: '' },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

activityLogSchema.index({ entityType: 1, entityId: 1 });
activityLogSchema.index({ performedBy: 1 });

export default mongoose.model('ActivityLog', activityLogSchema);
