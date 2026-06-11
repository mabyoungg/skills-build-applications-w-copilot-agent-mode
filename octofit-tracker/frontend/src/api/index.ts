import { getApiBaseUrl, apiFetch } from './client'

const collectionKeys = ['results', 'data', 'items', 'docs', 'records', 'content', 'payload']

function extractTotal(response, fallbackTotal) {
  if (!response || typeof response !== 'object') {
    return fallbackTotal
  }

  const totalCandidates = [
    response.total,
    response.count,
    response.totalItems,
    response.totalCount,
    response.meta?.total,
    response.meta?.count,
    response.pagination?.total,
  ]

  for (const total of totalCandidates) {
    if (typeof total === 'number') {
      return total
    }
  }

  return fallbackTotal
}

export function normalizeCollectionResponse(response) {
  if (Array.isArray(response)) {
    return { items: response, total: response.length, raw: response }
  }

  if (!response || typeof response !== 'object') {
    return { items: [], total: 0, raw: response }
  }

  for (const key of collectionKeys) {
    if (Array.isArray(response[key])) {
      return { items: response[key], total: extractTotal(response, response[key].length), raw: response }
    }
  }

  for (const key of collectionKeys) {
    if (response[key] && typeof response[key] === 'object') {
      const nested = normalizeCollectionResponse(response[key])
      if (nested.items.length > 0) {
        return { items: nested.items, total: extractTotal(response, nested.total), raw: response }
      }
    }
  }

  return { items: [], total: extractTotal(response, 0), raw: response }
}

export async function getUsers() {
  return normalizeCollectionResponse(await apiFetch('/api/users/'))
}

export async function getUserById(id) {
  return apiFetch(`/api/users/${id}`)
}

export async function createUser(data) {
  return apiFetch('/api/users/', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function getActivities() {
  return normalizeCollectionResponse(await apiFetch('/api/activities/'))
}

export async function getActivityById(id) {
  return apiFetch(`/api/activities/${id}`)
}

export async function createActivity(data) {
  return apiFetch('/api/activities/', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function getTeams() {
  return normalizeCollectionResponse(await apiFetch('/api/teams/'))
}

export async function getLeaderboard() {
  return normalizeCollectionResponse(await apiFetch('/api/leaderboard/'))
}

export async function getWorkouts() {
  return normalizeCollectionResponse(await apiFetch('/api/workouts/'))
}

export { getApiBaseUrl }
