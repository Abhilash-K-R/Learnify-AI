import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const link = ({ isActive }) => ({ className: isActive ? 'active' : '' })
  return (
    <div className="sidebar">
      <nav style={{ display:'grid', gap:8 }}>
        <NavLink to="/app" className={link}>🏠 Dashboard</NavLink>
        <NavLink to="/app/notes" className={link}>📄 Notes Generator</NavLink>
        <NavLink to="/app/quiz" className={link}>❓ Quiz Maker</NavLink>
        <NavLink to="/app/chat" className={link}>🤖 Doubt Solver</NavLink>
        <NavLink to="/app/progress" className={link}>📈 Progress</NavLink>
        <NavLink to="/app/settings" className={link}>⚙️ Settings</NavLink>
      </nav>
    </div>
  )
}
