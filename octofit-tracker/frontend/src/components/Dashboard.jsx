import { Link } from 'react-router-dom'
import { getApiBaseUrl } from '../api/client'

const sections = [
	{ label: 'Users', path: '/users', text: 'Browse athlete profiles and team assignments.' },
	{ label: 'Teams', path: '/teams', text: 'Inspect team rosters and memberships.' },
	{ label: 'Activities', path: '/activities', text: 'Review logged workouts and fitness activity.' },
	{ label: 'Leaderboard', path: '/leaderboard', text: 'See the live competitive ranking.' },
	{ label: 'Workouts', path: '/workouts', text: 'Track completed training sessions.' },
]

export default function Dashboard() {
	const apiBaseUrl = getApiBaseUrl()

	return (
		<div className="hero-card p-4 p-lg-5">
			<div className="row g-4 align-items-end">
				<div className="col-lg-7">
					<p className="section-kicker mb-2">Overview</p>
					<h2 className="display-5 fw-semibold mb-3">OctoFit Tracker presentation tier</h2>
					<p className="page-muted lead mb-0">
						React 19, Vite, Bootstrap, and react-router-dom are wired to the API tier with a
						Codespaces-aware base URL and localhost fallback.
					</p>
					<div className="mt-4 d-flex flex-wrap gap-2">
						<span className="badge rounded-pill collection-badge px-3 py-2">API: {apiBaseUrl}</span>
						<span className="badge rounded-pill collection-badge px-3 py-2">Router enabled</span>
						<span className="badge rounded-pill collection-badge px-3 py-2">Array + paginated support</span>
					</div>
				</div>
				<div className="col-lg-5">
					<div className="summary-card p-3 p-lg-4">
						<p className="section-kicker mb-2">Navigate</p>
						<div className="d-grid gap-2">
							{sections.map((section) => (
								<Link key={section.path} to={section.path} className="btn btn-outline-light text-start">
									<strong className="d-block">{section.label}</strong>
									<small className="page-muted">{section.text}</small>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}


