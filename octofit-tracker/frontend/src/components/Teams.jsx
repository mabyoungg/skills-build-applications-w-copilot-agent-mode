import { useEffect, useState } from 'react'
import { getTeams } from '../api/index'

function getMemberNames(memberIds) {
  if (!Array.isArray(memberIds)) {
    return []
  }

  return memberIds.map((member) => (typeof member === 'string' ? member : member.name || 'Member'))
}

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadTeams() {
      try {
        setLoading(true)
        const response = await getTeams()

        if (!cancelled) {
          setTeams(response.items)
          setTotal(response.total)
          setError('')
        }
      } catch (cause) {
        if (!cancelled) {
          setError(cause instanceof Error ? cause.message : 'Failed to load teams')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadTeams()

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return <div className="page-card p-5 text-center">Loading teams...</div>
  }

  if (error) {
    return <div className="page-card p-5 text-danger">{error}</div>
  }

  return (
    <section className="page-card p-4 p-lg-5">
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
        <div>
          <p className="section-kicker mb-2">Teams</p>
          <h2 className="h1 fw-semibold mb-2">Team rosters</h2>
          <p className="page-muted mb-0">Shows populated team members when the API returns them.</p>
        </div>
        <span className="badge rounded-pill collection-badge px-3 py-2">{total || teams.length} teams</span>
      </div>

      <div className="row g-3">
        {teams.length === 0 ? (
          <div className="col-12">
            <div className="empty-state p-4 text-center">No teams found.</div>
          </div>
        ) : (
          teams.map((team) => (
            <div key={team._id} className="col-12 col-lg-6 col-xxl-4">
              <div className="summary-card h-100 p-4">
                <h3 className="h5 fw-semibold mb-2">{team.name}</h3>
                <p className="page-muted mb-3">
                  {getMemberNames(team.memberIds).length} members
                </p>
                <div className="d-flex flex-wrap gap-2">
                  {getMemberNames(team.memberIds).length === 0 ? (
                    <span className="badge rounded-pill collection-badge px-3 py-2">No members</span>
                  ) : (
                    getMemberNames(team.memberIds).map((memberName) => (
                      <span key={memberName} className="badge rounded-pill collection-badge px-3 py-2">
                        {memberName}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}