import { useEffect, useState } from 'react'
import { getActivities } from '../api/index'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadActivities() {
      try {
        setLoading(true)
        const response = await getActivities()

        if (!cancelled) {
          setActivities(response.items)
          setTotal(response.total)
          setError('')
        }
      } catch (cause) {
        if (!cancelled) {
          setError(cause instanceof Error ? cause.message : 'Failed to load activities')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadActivities()

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return <div className="page-card p-5 text-center">Loading activities...</div>
  }

  if (error) {
    return <div className="page-card p-5 text-danger">{error}</div>
  }

  return (
    <section className="page-card p-4 p-lg-5">
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
        <div>
          <p className="section-kicker mb-2">Activities</p>
          <h2 className="h1 fw-semibold mb-2">Activity log</h2>
          <p className="page-muted mb-0">Supports array responses and paginated wrappers from the API.</p>
        </div>
        <span className="badge rounded-pill collection-badge px-3 py-2">{total || activities.length} activities</span>
      </div>

      <div className="row g-3">
        {activities.length === 0 ? (
          <div className="col-12">
            <div className="empty-state p-4 text-center">No activities found.</div>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity._id} className="col-12 col-lg-6 col-xxl-4">
              <div className="summary-card h-100 p-4">
                <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                  <h3 className="h5 fw-semibold mb-0">{activity.type}</h3>
                  <span className="badge rounded-pill collection-badge px-3 py-2">
                    {activity.durationMinutes} min
                  </span>
                </div>
                <p className="page-muted mb-2">
                  User: {typeof activity.userId === 'object' ? activity.userId?.name : activity.userId}
                </p>
                <p className="mb-0">{activity.notes || 'No notes provided.'}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}