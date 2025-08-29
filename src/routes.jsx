import React from 'react'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Notes from './pages/Notes'
import Quiz from './pages/Quiz'
import Chatbot from './pages/Chatbot'
import Progress from './pages/Progress'
import Settings from './pages/Settings'
import ProtectedRoute from './components/ProtectedRoute'

export default [
  { path: '/', element: <Landing /> },
  { path: '/auth', element: <Auth /> },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  },
  {
    path: '/app/notes',
    element: (
      <ProtectedRoute>
        <Notes />
      </ProtectedRoute>
    )
  },
  {
    path: '/app/quiz',
    element: (
      <ProtectedRoute>
        <Quiz />
      </ProtectedRoute>
    )
  },
  {
    path: '/app/chat',
    element: (
      <ProtectedRoute>
        <Chatbot />
      </ProtectedRoute>
    )
  },
  {
    path: '/app/progress',
    element: (
      <ProtectedRoute>
        <Progress />
      </ProtectedRoute>
    )
  },
  {
    path: '/app/settings',
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    )
  },
]
