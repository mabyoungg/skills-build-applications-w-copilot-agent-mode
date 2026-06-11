import { Schema, model } from 'mongoose'

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    notes: { type: String, trim: true },
  },
  { timestamps: true },
)

export const Activity = model('Activity', activitySchema)