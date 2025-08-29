import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import { answerQuestion } from '../lib/ai'

export default function Chatbot() {
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! Ask me any study doubt.' }
  ])

  function send() {
    if (!query.trim()) return
    const userMsg = { role: 'me', text: query }
    const botMsg = { role: 'bot', text: answerQuestion(query) }
    setMessages(m => [...m, userMsg, botMsg])
    setQuery('')
  }

  return (
    <>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <div className="page">
          <h2>🤖 Doubt Solver</h2>
          <div className="card chat">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role === 'me' ? 'me' : 'bot'}`}>
                {m.text}
              </div>
            ))}

            <div style={{ display:'flex', gap:8 }}>
              <input className="input" placeholder="Type your question..." value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter' && send()} />
              <button className="btn primary" onClick={send}>Send</button>
            </div>
          </div>
          <p className="small" style={{ marginTop:8 }}>
            Tip: Try “what is DBMS”, “explain microcontroller”, “what is algorithm”.
          </p>
        </div>
      </div>
    </>
  )
}
