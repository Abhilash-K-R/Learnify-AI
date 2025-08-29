import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import { getState, setUser, setState } from '../lib/storage'
import { useNavigate } from 'react-router-dom'

export default function Settings() {
  const { user } = getState()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [theme, setTheme] = useState('dark')
  const [lang, setLang] = useState('en')
  const nav = useNavigate()

  function save() {
    setUser({ ...user, name, email, theme, lang })
    alert('Saved!')
  }

  function logout() {
    setState({ user: null, notes: [], quizzes: [], progress: [] })
    nav('/auth')
  }

  return (
    <>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <div className="page">
          <h2>⚙️ Settings</h2>
          <div className="card" style={{ display:'grid', gap:12, maxWidth: 520 }}>
            <input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
            <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <div className="row">
              <select className="input" value={theme} onChange={e=>setTheme(e.target.value)}>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
              <select className="input" value={lang} onChange={e=>setLang(e.target.value)}>
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="kn">Kannada</option>
              </select>
            </div>
            <div style={{ display:'flex', gap:12 }}>
              <button className="btn ok" onClick={save}>Save</button>
              <button className="btn danger" onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
