import { getApiBaseUrl, apiFetch } from './client'

export async function getUsers() {
  return apiFetch('/api/users/')
}

export async function getUserById(id: string) {
  return apiFetch(`/api/users/${id}`)
}

export async function createUser(data: { name: string; email: string; teamId?: string }) {
  return apiFetch('/api/users/', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function getActivities() {
  return apiFetch('/api/activities/')
}

export async function getActivityById(id: string) {
  return apiFetch(`/api/activities/${id}`)
}

export async function createActivity(data: {
  userId: string
  type: string
  durationMinutes: number
  notes?: string
}) {
  return apiFetch('/api/activities/', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function getTeams() {
  return apiFetch('/api/teams/')
}

export async function getLeaderboard() {
  return apiFetch('/api/leaderboard/')
}

export async function getWorkouts() {
  return apiFetch('/api/workouts/')
}

export { getApiBaseUrl }
