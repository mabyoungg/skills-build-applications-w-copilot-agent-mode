import { Schema, model } from 'mongoose';
const workoutSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    completedAt: { type: Date, required: true },
}, { timestamps: true });
export const Workout = model('Workout', workoutSchema);
