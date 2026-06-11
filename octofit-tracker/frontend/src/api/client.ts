/**
 * API client configuration for OctoFit Tracker.
 * Supports both Codespaces and localhost environments.
 *
 * VITE_CODESPACE_NAME must be defined in .env.local for Codespaces builds.
 */

export function getApiBaseUrl(): string {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`
  }

  return 'http://localhost:8000'
}

/**
 * Fetch wrapper for API calls.
 * Automatically uses the correct base URL.
 */
export async function apiFetch(endpoint: string, options?: RequestInit) {
  const baseUrl = getApiBaseUrl()
  const url = `${baseUrl}${endpoint}`

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`)
  }

  return response.json()
}
