import { Link, useLocation } from 'react-router-dom'
import { getState } from '../lib/storage'

export default function Navbar() {
  const { user } = getState()
  const loc = useLocation()
  const onApp = loc.pathname.startsWith('/app')

  return (
    <div className="navbar">
      <div className="nav-inner">
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <img src="/favicon.svg" alt="logo" width="26" height="26" />
          <Link to="/" style={{ fontWeight:800, letterSpacing:0.3, fontSize:18 }}>Learnify AI</Link>
        </div>

        <div style={{ display:'flex', gap:12, alignItems:'center' }}>
          {!onApp && (<>
            <a href="#features">Features</a>
            <a href="#about">About</a>
          </>)}
          {user ? (
            <Link className="btn" to="/app">Open App</Link>
          ) : (
            <Link className="btn primary" to="/auth">Login / Signup</Link>
          )}
        </div>
      </div>
    </div>
  )
}
