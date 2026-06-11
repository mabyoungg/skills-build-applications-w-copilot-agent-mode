import { useState, useEffect, FC } from 'react'
import { getUsers, getActivities, getLeaderboard, getApiBaseUrl } from '../api/index'
import './Dashboard.css'

interface User {
  _id: string
  name: string
  email: string
}

interface Activity {
  _id: string
  type: string
  durationMinutes: number
  notes?: string
}

interface LeaderboardEntry {
  _id: string
  teamId: {
    _id: string
    name: string
  }
  score: number
}

export const Dashboard: FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [apiBaseUrl, setApiBaseUrl] = useState('')

  useEffect(() => {
    const apiUrl = getApiBaseUrl()
    setApiBaseUrl(apiUrl)

    const loadData = async () => {
      try {
        setLoading(true)
        const [usersData, activitiesData, leaderboardData] = await Promise.all([
          getUsers(),
          getActivities(),
          getLeaderboard(),
        ])

        setUsers(usersData)
        setActivities(activitiesData)
        setLeaderboard(leaderboardData)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return <div className="dashboard-loading">Loading OctoFit data...</div>
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <h2>Error</h2>
        <p>{error}</p>
        <p>API Base URL: {apiBaseUrl}</p>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>OctoFit Tracker Dashboard</h1>
        <p className="api-info">API Base URL: {apiBaseUrl}</p>
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-card users-section">
          <h2>Users ({users.length})</h2>
          <ul className="user-list">
            {users.map((user) => (
              <li key={user._id}>
                <strong>{user.name}</strong>
                <br />
                <small>{user.email}</small>
              </li>
            ))}
          </ul>
        </section>

        <section className="dashboard-card activities-section">
          <h2>Recent Activities ({activities.length})</h2>
          <ul className="activity-list">
            {activities.slice(0, 5).map((activity) => (
              <li key={activity._id}>
                <strong>{activity.type}</strong>
                <br />
                <small>{activity.durationMinutes} min - {activity.notes}</small>
              </li>
            ))}
          </ul>
        </section>

        <section className="dashboard-card leaderboard-section">
          <h2>Leaderboard ({leaderboard.length})</h2>
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Team</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry._id}>
                  <td>{entry.teamId?.name || 'Unknown'}</td>
                  <td>{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  )
}
