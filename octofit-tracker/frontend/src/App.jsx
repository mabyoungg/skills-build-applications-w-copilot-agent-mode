import './App.css'

function App() {
  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">OctoFit Tracker</p>
        <h1>Modern multi-tier fitness tracking for teams and users.</h1>
        <p className="lead">
          React 19 on the frontend, Express and TypeScript on the backend, and Mongoose-ready
          models for MongoDB.
        </p>
        <div className="action-row">
          <a className="btn btn-primary btn-lg" href="http://localhost:5173">
            Frontend on 5173
          </a>
          <a className="btn btn-outline-light btn-lg" href="http://localhost:8000/api/health">
            Backend health
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
