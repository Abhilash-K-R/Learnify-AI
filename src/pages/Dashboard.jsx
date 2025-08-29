import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { getState } from '../lib/storage'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { user, notes, progress } = getState()

  const lastScore = progress?.[0]?.score ?? null

  return (
    <>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <div className="page">
          <h2>Hi {user?.name} 👋</h2>
          <p className="small">Welcome back! What do you want to do today?</p>

          <div className="row" style={{ marginTop: 12 }}>
            <div className="card">
              <h3>Quick Actions</h3>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <Link className="btn" to="/app/notes">Generate Notes</Link>
                <Link className="btn" to="/app/quiz">Take a Quiz</Link>
                <Link className="btn" to="/app/chat">Ask a Doubt</Link>
              </div>
            </div>

            <div className="card">
              <h3>Recent</h3>
              {notes?.length ? (
                <ul>
                  {notes.slice(0,3).map(n => (
                    <li key={n.id}><span className="badge">{n.level}</span> {n.title}</li>
                  ))}
                </ul>
              ) : <p className="small">No notes yet.</p>}
            </div>
          </div>

          <div className="row" style={{ marginTop: 12 }}>
            <div className="card">
              <h3>Progress Snapshot</h3>
              {lastScore !== null ? (
                <p>Your last quiz score: <b>{lastScore}%</b></p>
              ) : (<p className="small">No quiz attempts yet.</p>)}
            </div>
            <div className="card">
              <h3>Tips</h3>
              <p className="small">Try: generate short notes → quiz → chatbot for doubts → check progress.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
