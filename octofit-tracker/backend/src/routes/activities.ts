import { Router, Request, Response } from 'express'
import { Activity } from '../models/Activity.js'

export const activitiesRouter = Router()

// GET /api/activities/ - List all activities
activitiesRouter.get('/', async (_request: Request, response: Response) => {
  try {
    const activities = await Activity.find().populate('userId')
    response.json(activities)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch activities' })
  }
})

// GET /api/activities/:id - Get single activity
activitiesRouter.get('/:id', async (request: Request, response: Response) => {
  try {
    const activity = await Activity.findById(request.params.id).populate('userId')
    if (!activity) {
      response.status(404).json({ error: 'Activity not found' })
      return
    }
    response.json(activity)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch activity' })
  }
})

// POST /api/activities/ - Create new activity
activitiesRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { userId, type, durationMinutes, notes } = request.body

    if (!userId || !type || durationMinutes === undefined) {
      response
        .status(400)
        .json({ error: 'userId, type, and durationMinutes are required' })
      return
    }

    const activity = new Activity({ userId, type, durationMinutes, notes })
    await activity.save()
    response.status(201).json(activity)
  } catch (error) {
    response.status(500).json({ error: 'Failed to create activity' })
  }
})

// PUT /api/activities/:id - Update activity
activitiesRouter.put('/:id', async (request: Request, response: Response) => {
  try {
    const { userId, type, durationMinutes, notes } = request.body
    const activity = await Activity.findByIdAndUpdate(
      request.params.id,
      { userId, type, durationMinutes, notes },
      { new: true },
    )

    if (!activity) {
      response.status(404).json({ error: 'Activity not found' })
      return
    }

    response.json(activity)
  } catch (error) {
    response.status(500).json({ error: 'Failed to update activity' })
  }
})

// DELETE /api/activities/:id - Delete activity
activitiesRouter.delete('/:id', async (request: Request, response: Response) => {
  try {
    const activity = await Activity.findByIdAndDelete(request.params.id)

    if (!activity) {
      response.status(404).json({ error: 'Activity not found' })
      return
    }

    response.json({ message: 'Activity deleted' })
  } catch (error) {
    response.status(500).json({ error: 'Failed to delete activity' })
  }
})
