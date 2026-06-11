import { Schema, model } from 'mongoose';
const leaderboardSchema = new Schema({
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true, unique: true },
    score: { type: Number, required: true, default: 0 },
}, { timestamps: true });
export const Leaderboard = model('Leaderboard', leaderboardSchema);
