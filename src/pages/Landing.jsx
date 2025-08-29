import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <>
      <Navbar />
      <div className="container">
        <section className="hero">
          <div>
            <h1>Learn faster with your AI-powered study buddy.</h1>
            <p>Summarize notes, generate quizzes, clear doubts, and track progress — all in one simple app built for students.</p>
            <div style={{ display:'flex', gap:12 }}>
              <Link to="/auth" className="btn primary">Get Started Free</Link>
              <a href="#features" className="btn">See Features</a>
            </div>
          </div>
          <div className="card">
            <div className="stack">
              <div className="badge">✨ Smart Notes</div>
              <div className="badge">🧠 Quiz Maker</div>
              <div className="badge">🤖 Chatbot</div>
              <div className="badge">📈 Progress</div>
            </div>
          </div>
        </section>

        <section id="features" style={{ marginTop: 24 }}>
          <h2>Core Features</h2>
          <div className="grid4">
            <div className="card"><b>Notes Generator</b><p className="small">Upload/paste text and get clean summaries.</p></div>
            <div className="card"><b>Quiz Maker</b><p className="small">MCQ/TF/Short questions from your notes.</p></div>
            <div className="card"><b>Doubt Solver</b><p className="small">Ask anything and get instant guidance.</p></div>
            <div className="card"><b>Progress</b><p className="small">See weak topics and improvements.</p></div>
          </div>
        </section>

        <section id="about" className="footer">
          © {new Date().getFullYear()} Learnify AI · Made for students
        </section>
      </div>
    </>
  )
}
