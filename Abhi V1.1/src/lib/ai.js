// Lightweight "AI-like" helpers so the app works without external APIs.
// You can later replace these with real AI endpoints.

export function summarizeText(text, level = 'medium', format = 'bullets') {
  const sentences = text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s/)
    .filter(Boolean)

  let keep = sentences.length
  if (level === 'short') keep = Math.max(3, Math.ceil(sentences.length * 0.2))
  if (level === 'medium') keep = Math.max(5, Math.ceil(sentences.length * 0.4))
  if (level === 'detailed') keep = Math.max(8, Math.ceil(sentences.length * 0.7))

  const picked = sentences.slice(0, keep)
  if (format === 'bullets') {
    return picked.map(s => `• ${s.trim()}`).join('\n')
  }
  return picked.join(' ')
}

const SAMPLE_FACTS = [
  { q: 'what is dbms', a: 'DBMS (Database Management System) manages data using tables and queries, ensuring consistency, security, and concurrency control.' },
  { q: 'what is algorithm', a: 'An algorithm is a finite, ordered set of instructions to solve a class of problems.' },
  { q: 'explain microcontroller', a: 'A microcontroller is a compact IC with CPU, memory, and I/O used to control embedded systems.' },
]

export function answerQuestion(query) {
  const q = query.toLowerCase().trim()
  const hit = SAMPLE_FACTS.find(f => q.includes(f.q))
  if (hit) return hit.a

  // fallback: simple explainer
  if (q.startsWith('explain')) {
    return `Here’s a simple explanation of "${query}": it consists of core concepts, practical examples, and common pitfalls. Break it into definitions, key properties, and a real-world analogy to understand it faster.`
  }
  return `I’m not fully sure yet, but here’s how to approach "${query}": define terms, list assumptions, give an example, and verify edge-cases.`
}

export function generateQuiz(text, type='mcq', difficulty='easy') {
  // basic keywords = first few nouns-like words (super naive)
  const words = text
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 4)
  const topics = Array.from(new Set(words)).slice(0, 6)

  const pick = (arr, n) => arr.slice(0, n)

  if (type === 'tf') {
    return pick(topics, 5).map((t, i) => ({
      id: i+1,
      kind: 'tf',
      prompt: `True/False: ${t} is important in this topic.`,
      answer: i % 2 === 0 ? 'True' : 'False'
    }))
  }

  if (type === 'short') {
    return pick(topics, 5).map((t, i) => ({
      id: i+1,
      kind: 'short',
      prompt: `Define: ${t}`,
      answer: `${t} is a key term.`
    }))
  }

  // default: MCQ
  return pick(topics, 5).map((t, i) => {
    const options = [
      `${t} definition`,
      `${t} example`,
      `${t} property`,
      `${t} use-case`
    ]
    return {
      id: i+1,
      kind: 'mcq',
      prompt: `Which option best relates to "${t}"?`,
      options,
      answer: options[i % options.length]
    }
  })
}

export function evaluateQuiz(generated, userAnswers) {
  let correct = 0
  generated.forEach(q => {
    const ua = userAnswers[q.id]
    if (!ua) return
    if (q.kind === 'mcq' && ua === q.answer) correct++
    if (q.kind === 'tf' && ua === q.answer) correct++
    if (q.kind === 'short' && ua.trim().length > 0) correct++ // leniency
  })
  const score = Math.round((correct / generated.length) * 100)
  return { correct, total: generated.length, score }
}
