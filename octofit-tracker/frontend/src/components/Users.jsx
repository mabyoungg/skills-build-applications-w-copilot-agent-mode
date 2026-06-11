import { useEffect, useState } from 'react'
import { getUsers } from '../api/index'

function getTeamName(team) {
  if (!team) {
    return 'Unassigned'
  }

  if (typeof team === 'string') {
    return team
  }

  return team.name || 'Unassigned'
}

export default function Users() {
  const [users, setUsers] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadUsers() {
      try {
        setLoading(true)
        const response = await getUsers()

        if (!cancelled) {
          setUsers(response.items)
          setTotal(response.total)
          setError('')
        }
      } catch (cause) {
        if (!cancelled) {
          setError(cause instanceof Error ? cause.message : 'Failed to load users')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadUsers()

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return <div className="page-card p-5 text-center">Loading users...</div>
  }

  if (error) {
    return <div className="page-card p-5 text-danger">{error}</div>
  }

  return (
    <section className="page-card p-4 p-lg-5">
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
        <div>
          <p className="section-kicker mb-2">Users</p>
          <h2 className="h1 fw-semibold mb-2">Athlete profiles</h2>
          <p className="page-muted mb-0">Compatible with array or paginated API responses.</p>
        </div>
        <span className="badge rounded-pill collection-badge px-3 py-2">{total || users.length} users</span>
      </div>

      <div className="table-responsive">
        <table className="table table-dark table-hover align-middle collection-table mb-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="3">
                  <div className="empty-state p-4 text-center">No users found.</div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td className="fw-semibold">{user.name}</td>
                  <td>{user.email}</td>
                  <td>{getTeamName(user.teamId)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}