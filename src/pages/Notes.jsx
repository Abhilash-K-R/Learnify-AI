import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import { summarizeText } from '../lib/ai'
import { addNote } from '../lib/storage'

export default function Notes() {
  const [title, setTitle] = useState('')
  const [input, setInput] = useState('')
  const [level, setLevel] = useState('medium')
  const [format, setFormat] = useState('bullets')
  const [output, setOutput] = useState('')

  function generate() {
    if (!input.trim()) return
    const sum = summarizeText(input, level, format)
    setOutput(sum)
    addNote({
      id: Date.now(),
      title: title || 'Untitled Notes',
      level, format,
      content: sum,
      createdAt: new Date().toISOString()
    })
  }

  return (
    <>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <div className="page">
          <h2>📄 Notes Generator</h2>
          <div className="card" style={{ display:'grid', gap:12 }}>
            <input className="input" placeholder="Notes Title (optional)" value={title} onChange={e=>setTitle(e.target.value)} />
            <textarea rows="8" className="input" placeholder="Paste your text or notes here..." value={input} onChange={e=>setInput(e.target.value)} />
            <div className="row">
              <select className="input" value={level} onChange={e=>setLevel(e.target.value)}>
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="detailed">Detailed</option>
              </select>
              <select className="input" value={format} onChange={e=>setFormat(e.target.value)}>
                <option value="bullets">Bullet Points</option>
                <option value="paragraph">Paragraph</option>
              </select>
            </div>
            <button className="btn primary" onClick={generate}>Generate Notes</button>
          </div>

          {output && (
            <div className="card" style={{ marginTop: 12 }}>
              <h3>Output</h3>
              <pre style={{ whiteSpace:'pre-wrap' }}>{output}</pre>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
