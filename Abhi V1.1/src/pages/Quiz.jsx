import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import { generateQuiz, evaluateQuiz } from '../lib/ai'
import { addQuiz, addProgress } from '../lib/storage'

export default function Quiz() {
  const [source, setSource] = useState('')
  const [type, setType] = useState('mcq')
  const [difficulty, setDifficulty] = useState('easy')
  const [qs, setQs] = useState([])
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  function build() {
    if (!source.trim()) return
    const gen = generateQuiz(source, type, difficulty)
    setQs(gen)
    setAnswers({})
    setResult(null)
    addQuiz({ id: Date.now(), type, difficulty, count: gen.length, createdAt: new Date().toISOString() })
  }

  function submit() {
    const res = evaluateQuiz(qs, answers)
    setResult(res)
    addProgress({ id: Date.now(), score: res.score, date: new Date().toISOString(), meta: { type, difficulty } })
  }

  return (
    <>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <div className="page">
          <h2>❓ Quiz Maker</h2>
          <div className="card" style={{ display:'grid', gap:12 }}>
            <textarea rows="6" className="input" placeholder="Paste topic text or notes here..." value={source} onChange={e=>setSource(e.target.value)} />
            <div className="row">
              <select className="input" value={type} onChange={e=>setType(e.target.value)}>
                <option value="mcq">MCQ</option>
                <option value="tf">True / False</option>
                <option value="short">Short Answer</option>
              </select>
              <select className="input" value={difficulty} onChange={e=>setDifficulty(e.target.value)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <button className="btn primary" onClick={build}>Generate Quiz</button>
          </div>

          {qs.length > 0 && (
            <div className="card" style={{ marginTop: 12 }}>
              <h3>Questions</h3>
              <div style={{ display:'grid', gap:12 }}>
                {qs.map(q => (
                  <div key={q.id}>
                    <div style={{ fontWeight:600 }}>{q.id}. {q.prompt}</div>
                    {q.kind === 'mcq' && (
                      <div style={{ display:'grid', gap:8, marginTop:6 }}>
                        {q.options.map(opt => (
                          <label key={opt} style={{ display:'flex', gap:8, alignItems:'center' }}>
                            <input
                              type="radio"
                              name={`q${q.id}`}
                              checked={answers[q.id] === opt}
                              onChange={()=>setAnswers(a => ({ ...a, [q.id]: opt }))}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    {q.kind === 'tf' && (
                      <div style={{ display:'flex', gap:12, marginTop:6 }}>
                        {['True','False'].map(opt => (
                          <label key={opt} style={{ display:'flex', gap:8, alignItems:'center' }}>
                            <input
                              type="radio"
                              name={`q${q.id}`}
                              checked={answers[q.id] === opt}
                              onChange={()=>setAnswers(a => ({ ...a, [q.id]: opt }))}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    {q.kind === 'short' && (
                      <input className="input" placeholder="Your answer..." value={answers[q.id] || ''} onChange={e=>setAnswers(a => ({ ...a, [q.id]: e.target.value }))} />
                    )}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, display:'flex', gap:12 }}>
                <button className="btn ok" onClick={submit}>Submit</button>
              </div>
              {result && (
                <div style={{ marginTop: 12 }}>
                  <b>Score:</b> {result.score}% ({result.correct}/{result.total})
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
