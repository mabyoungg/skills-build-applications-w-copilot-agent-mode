import { useEffect, useState } from 'react'
import { apiFetch } from '../api/client'
import { normalizeCollectionResponse } from '../api/index'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`
  : 'http://localhost:8000/api/leaderboard'

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadLeaderboard() {
      try {
        setLoading(true)
        const response = normalizeCollectionResponse(await apiFetch(leaderboardEndpoint))

        if (!cancelled) {
          setLeaderboard(response.items)
          setTotal(response.total)
          setError('')
        }
      } catch (cause) {
        if (!cancelled) {
          setError(cause instanceof Error ? cause.message : 'Failed to load leaderboard')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadLeaderboard()

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return <div className="page-card p-5 text-center">Loading leaderboard...</div>
  }

  if (error) {
    return <div className="page-card p-5 text-danger">{error}</div>
  }

  return (
    <section className="page-card p-4 p-lg-5">
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
        <div>
          <p className="section-kicker mb-2">Leaderboard</p>
          <h2 className="h1 fw-semibold mb-2">Competition ranking</h2>
          <p className="page-muted mb-0">Works with populated team objects or ID-only payloads.</p>
        </div>
        <span className="badge rounded-pill collection-badge px-3 py-2">{total || leaderboard.length} entries</span>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-hover align-middle collection-table mb-0">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length === 0 ? (
              <tr>
                <td colSpan="3">
                  <div className="empty-state p-4 text-center">No leaderboard entries found.</div>
                </td>
              </tr>
            ) : (
              leaderboard.map((entry, index) => (
                <tr key={entry._id}>
                  <td className="fw-semibold">#{index + 1}</td>
                  <td>{typeof entry.teamId === 'object' ? entry.teamId?.name : entry.teamId}</td>
                  <td>{entry.score}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}