// Simple localStorage helpers

const KEY = 'learnify_state_v1'

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : { user: null, notes: [], quizzes: [], progress: [] }
  } catch {
    return { user: null, notes: [], quizzes: [], progress: [] }
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state))
}

let state = loadState()

export function getState() { return state }
export function setState(next) { state = next; saveState(state) }

// Convenience updaters
export function setUser(user) {
  setState({ ...state, user })
}
export function addNote(note) {
  setState({ ...state, notes: [note, ...state.notes] })
}
export function addQuiz(quiz) {
  setState({ ...state, quizzes: [quiz, ...state.quizzes] })
}
export function addProgress(entry) {
  setState({ ...state, progress: [entry, ...state.progress] })
}
