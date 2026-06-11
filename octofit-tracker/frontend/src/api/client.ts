/**
 * API client configuration for OctoFit Tracker.
 * Supports both Codespaces and localhost environments.
 */

export function getApiBaseUrl(): string {
  // Check if we're running in Codespaces by hostname pattern
  const hostname = window.location.hostname
  
  // Codespaces URLs have pattern: xxx-8000.app.github.dev
  if (hostname.includes('app.github.dev')) {
    // Extract codespace name from hostname (e.g., "opulent-pancake-gg799q76q64c77w" from "opulent-pancake-gg799q76q64c77w-5173.app.github.dev")
    const codespaceName = hostname.split('-').slice(0, -2).join('-')
    if (codespaceName) {
      return `https://${codespaceName}-8000.app.github.dev`
    }
  }

  // Check environment variable (for build-time configuration)
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`
  }

  // Default to localhost for local development
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
