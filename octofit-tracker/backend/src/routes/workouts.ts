import { Router, Request, Response } from 'express'
import { Workout } from '../models/Workout.js'

export const workoutsRouter = Router()

// GET /api/workouts/ - List all workouts
workoutsRouter.get('/', async (_request: Request, response: Response) => {
  try {
    const workouts = await Workout.find().populate('userId')
    response.json(workouts)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch workouts' })
  }
})

// GET /api/workouts/:id - Get single workout
workoutsRouter.get('/:id', async (request: Request, response: Response) => {
  try {
    const workout = await Workout.findById(request.params.id).populate('userId')
    if (!workout) {
      response.status(404).json({ error: 'Workout not found' })
      return
    }
    response.json(workout)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch workout' })
  }
})

// POST /api/workouts/ - Create new workout
workoutsRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { userId, title, completedAt } = request.body

    if (!userId || !title || !completedAt) {
      response.status(400).json({ error: 'userId, title, and completedAt are required' })
      return
    }

    const workout = new Workout({ userId, title, completedAt })
    await workout.save()
    response.status(201).json(workout)
  } catch (error) {
    response.status(500).json({ error: 'Failed to create workout' })
  }
})

// PUT /api/workouts/:id - Update workout
workoutsRouter.put('/:id', async (request: Request, response: Response) => {
  try {
    const { userId, title, completedAt } = request.body
    const workout = await Workout.findByIdAndUpdate(
      request.params.id,
      { userId, title, completedAt },
      { new: true },
    )

    if (!workout) {
      response.status(404).json({ error: 'Workout not found' })
      return
    }

    response.json(workout)
  } catch (error) {
    response.status(500).json({ error: 'Failed to update workout' })
  }
})

// DELETE /api/workouts/:id - Delete workout
workoutsRouter.delete('/:id', async (request: Request, response: Response) => {
  try {
    const workout = await Workout.findByIdAndDelete(request.params.id)

    if (!workout) {
      response.status(404).json({ error: 'Workout not found' })
      return
    }

    response.json({ message: 'Workout deleted' })
  } catch (error) {
    response.status(500).json({ error: 'Failed to delete workout' })
  }
})
