import { Router, Request, Response } from 'express'
import { User } from '../models/User.js'

export const usersRouter = Router()

// GET /api/users/ - List all users
usersRouter.get('/', async (_request: Request, response: Response) => {
  try {
    const users = await User.find().populate('teamId')
    response.json(users)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch users' })
  }
})

// GET /api/users/:id - Get single user
usersRouter.get('/:id', async (request: Request, response: Response) => {
  try {
    const user = await User.findById(request.params.id).populate('teamId')
    if (!user) {
      response.status(404).json({ error: 'User not found' })
      return
    }
    response.json(user)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch user' })
  }
})

// POST /api/users/ - Create new user
usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { name, email, teamId } = request.body

    if (!name || !email) {
      response.status(400).json({ error: 'Name and email are required' })
      return
    }

    const user = new User({ name, email, teamId })
    await user.save()
    response.status(201).json(user)
  } catch (error) {
    response.status(500).json({ error: 'Failed to create user' })
  }
})

// PUT /api/users/:id - Update user
usersRouter.put('/:id', async (request: Request, response: Response) => {
  try {
    const { name, email, teamId } = request.body
    const user = await User.findByIdAndUpdate(
      request.params.id,
      { name, email, teamId },
      { new: true },
    )

    if (!user) {
      response.status(404).json({ error: 'User not found' })
      return
    }

    response.json(user)
  } catch (error) {
    response.status(500).json({ error: 'Failed to update user' })
  }
})

// DELETE /api/users/:id - Delete user
usersRouter.delete('/:id', async (request: Request, response: Response) => {
  try {
    const user = await User.findByIdAndDelete(request.params.id)

    if (!user) {
      response.status(404).json({ error: 'User not found' })
      return
    }

    response.json({ message: 'User deleted' })
  } catch (error) {
    response.status(500).json({ error: 'Failed to delete user' })
  }
})
