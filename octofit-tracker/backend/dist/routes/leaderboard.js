import { Router } from 'express';
import { Leaderboard } from '../models/Leaderboard.js';
export const leaderboardRouter = Router();
// GET /api/leaderboard/ - List all leaderboard entries
leaderboardRouter.get('/', async (_request, response) => {
    try {
        const entries = await Leaderboard.find().populate('teamId').sort({ score: -1 });
        response.json(entries);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
// GET /api/leaderboard/:id - Get single leaderboard entry
leaderboardRouter.get('/:id', async (request, response) => {
    try {
        const entry = await Leaderboard.findById(request.params.id).populate('teamId');
        if (!entry) {
            response.status(404).json({ error: 'Leaderboard entry not found' });
            return;
        }
        response.json(entry);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to fetch leaderboard entry' });
    }
});
// POST /api/leaderboard/ - Create new leaderboard entry
leaderboardRouter.post('/', async (request, response) => {
    try {
        const { teamId, score } = request.body;
        if (!teamId) {
            response.status(400).json({ error: 'teamId is required' });
            return;
        }
        const entry = new Leaderboard({ teamId, score: score || 0 });
        await entry.save();
        response.status(201).json(entry);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to create leaderboard entry' });
    }
});
// PUT /api/leaderboard/:id - Update leaderboard entry
leaderboardRouter.put('/:id', async (request, response) => {
    try {
        const { teamId, score } = request.body;
        const entry = await Leaderboard.findByIdAndUpdate(request.params.id, { teamId, score }, { new: true });
        if (!entry) {
            response.status(404).json({ error: 'Leaderboard entry not found' });
            return;
        }
        response.json(entry);
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to update leaderboard entry' });
    }
});
// DELETE /api/leaderboard/:id - Delete leaderboard entry
leaderboardRouter.delete('/:id', async (request, response) => {
    try {
        const entry = await Leaderboard.findByIdAndDelete(request.params.id);
        if (!entry) {
            response.status(404).json({ error: 'Leaderboard entry not found' });
            return;
        }
        response.json({ message: 'Leaderboard entry deleted' });
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to delete leaderboard entry' });
    }
});
