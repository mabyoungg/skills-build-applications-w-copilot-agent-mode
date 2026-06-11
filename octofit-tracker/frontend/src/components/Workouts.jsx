import { useEffect, useState } from 'react'
import { getWorkouts } from '../api/index'

function formatDate(value) {
  if (!value) {
    return 'Unknown date'
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString()
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadWorkouts() {
      try {
        setLoading(true)
        const response = await getWorkouts()

        if (!cancelled) {
          setWorkouts(response.items)
          setTotal(response.total)
          setError('')
        }
      } catch (cause) {
        if (!cancelled) {
          setError(cause instanceof Error ? cause.message : 'Failed to load workouts')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadWorkouts()

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return <div className="page-card p-5 text-center">Loading workouts...</div>
  }

  if (error) {
    return <div className="page-card p-5 text-danger">{error}</div>
  }

  return (
    <section className="page-card p-4 p-lg-5">
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
        <div>
          <p className="section-kicker mb-2">Workouts</p>
          <h2 className="h1 fw-semibold mb-2">Completed sessions</h2>
          <p className="page-muted mb-0">Displays completed workout records from the API.</p>
        </div>
        <span className="badge rounded-pill collection-badge px-3 py-2">{total || workouts.length} workouts</span>
      </div>

      <div className="row g-3">
        {workouts.length === 0 ? (
          <div className="col-12">
            <div className="empty-state p-4 text-center">No workouts found.</div>
          </div>
        ) : (
          workouts.map((workout) => (
            <div key={workout._id} className="col-12 col-lg-6 col-xxl-4">
              <div className="summary-card h-100 p-4">
                <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                  <h3 className="h5 fw-semibold mb-0">{workout.title}</h3>
                  <span className="badge rounded-pill collection-badge px-3 py-2">
                    {formatDate(workout.completedAt)}
                  </span>
                </div>
                <p className="page-muted mb-0">
                  User: {typeof workout.userId === 'object' ? workout.userId?.name : workout.userId}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}