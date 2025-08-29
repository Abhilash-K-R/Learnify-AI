import Navbar from '../components/Navbar'
import { useState } from 'react'
import { setUser, getState } from '../lib/storage'
import { useNavigate } from 'react-router-dom'

export default function Auth() {
  const [name, setName] = useState(getState().user?.name || '')
  const [email, setEmail] = useState(getState().user?.email || '')
  const nav = useNavigate()

  function submit(e) {
    e.preventDefault()
    if (!name || !email) return
    setUser({ name, email })
    nav('/app')
  }

  return (
    <>
      <Navbar />
      <div className="container" style={{ maxWidth: 520 }}>
        <div className="card">
          <h2>Login / Signup</h2>
          <p className="small">No password in this demo — just enter your name and email.</p>
          <form onSubmit={submit} style={{ display:'grid', gap:12 }}>
            <input className="input" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
            <input className="input" placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} />
            <button className="btn primary">Continue</button>
          </form>
        </div>
      </div>
    </>
  )
}
