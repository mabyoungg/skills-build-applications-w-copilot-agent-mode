import './App.css'
import { Navigate, NavLink, Outlet, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Users from './components/Users'
import Teams from './components/Teams'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Workouts from './components/Workouts'

function App() {
  return (
    <Routes>
      <Route
        element={
          <div className="app-shell">
            <header className="app-header border-bottom border-white border-opacity-10">
              <div className="container-fluid py-3 px-4 px-lg-5 d-flex flex-column flex-lg-row gap-3 align-items-lg-center justify-content-between">
                <div>
                  <p className="app-eyebrow mb-1">OctoFit Tracker</p>
                  <h1 className="app-title mb-0">React 19 presentation tier</h1>
                  <p className="app-note mb-0 mt-2">
                    Set VITE_CODESPACE_NAME in .env.local for Codespaces. Leave it empty for localhost.
                  </p>
                </div>
                <nav className="app-nav nav nav-pills flex-wrap gap-2">
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/">
                    Overview
                  </NavLink>
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/users">
                    Users
                  </NavLink>
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/teams">
                    Teams
                  </NavLink>
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/activities">
                    Activities
                  </NavLink>
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/leaderboard">
                    Leaderboard
                  </NavLink>
                  <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/workouts">
                    Workouts
                  </NavLink>
                </nav>
              </div>
            </header>

            <main className="app-content container-fluid px-3 px-lg-5 py-4 py-lg-5">
              <Outlet />
            </main>
          </div>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="teams" element={<Teams />} />
        <Route path="activities" element={<Activities />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="workouts" element={<Workouts />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
