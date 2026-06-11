import { Router, Request, Response } from 'express'
import { Team } from '../models/Team.js'

export const teamsRouter = Router()

// GET /api/teams/ - List all teams
teamsRouter.get('/', async (_request: Request, response: Response) => {
  try {
    const teams = await Team.find().populate('memberIds')
    response.json(teams)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch teams' })
  }
})

// GET /api/teams/:id - Get single team
teamsRouter.get('/:id', async (request: Request, response: Response) => {
  try {
    const team = await Team.findById(request.params.id).populate('memberIds')
    if (!team) {
      response.status(404).json({ error: 'Team not found' })
      return
    }
    response.json(team)
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch team' })
  }
})

// POST /api/teams/ - Create new team
teamsRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { name, memberIds } = request.body

    if (!name) {
      response.status(400).json({ error: 'Team name is required' })
      return
    }

    const team = new Team({ name, memberIds: memberIds || [] })
    await team.save()
    response.status(201).json(team)
  } catch (error) {
    response.status(500).json({ error: 'Failed to create team' })
  }
})

// PUT /api/teams/:id - Update team
teamsRouter.put('/:id', async (request: Request, response: Response) => {
  try {
    const { name, memberIds } = request.body
    const team = await Team.findByIdAndUpdate(
      request.params.id,
      { name, memberIds },
      { new: true },
    )

    if (!team) {
      response.status(404).json({ error: 'Team not found' })
      return
    }

    response.json(team)
  } catch (error) {
    response.status(500).json({ error: 'Failed to update team' })
  }
})

// DELETE /api/teams/:id - Delete team
teamsRouter.delete('/:id', async (request: Request, response: Response) => {
  try {
    const team = await Team.findByIdAndDelete(request.params.id)

    if (!team) {
      response.status(404).json({ error: 'Team not found' })
      return
    }

    response.json({ message: 'Team deleted' })
  } catch (error) {
    response.status(500).json({ error: 'Failed to delete team' })
  }
})
