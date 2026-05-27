import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(username, password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid username or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          {/* Logo Mark */}
          <div className="flex items-center justify-center gap-3 mb-3">
            {/* Icon */}
            <div style={{
              background: 'linear-gradient(135deg, #1e1b4b 0%, #2e1065 100%)',
              borderRadius: '14px',
              padding: '10px',
              display: 'inline-flex',
              boxShadow: '0 0 0 1px rgba(99,102,241,0.3), 0 8px 24px rgba(79,70,229,0.25)',
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="38" height="38">
                <defs>
                  <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#818CF8" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                </defs>
                <text x="4" y="42" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="36" fill="url(#logoGrad)">3</text>
                <text x="30" y="42" fontFamily="Arial Black, Arial, sans-serif" fontWeight="900" fontSize="36" fill="url(#logoGrad)">A</text>
                <polyline points="8,56 18,50 28,54 42,44 56,36" fill="none" stroke="url(#logoGrad)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="50,31 56,36 51,41" fill="none" stroke="#A78BFA" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {/* Text */}
            <div className="text-left">
              <h1 style={{
                fontSize: '1.6rem',
                fontWeight: '800',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #818CF8 0%, #A78BFA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.1,
                margin: 0,
              }}>
                3A TrackPro
              </h1>
              <p style={{ color: '#6B7280', fontSize: '0.72rem', margin: '3px 0 0', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Performance Tracking System
              </p>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
          {error && (
            <div className="bg-red-950/60 border border-red-800/50 rounded-lg px-4 py-2.5 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs text-gray-500 mb-1.5 uppercase tracking-wider">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoComplete="username"
              placeholder="Enter your username"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-600 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1.5 uppercase tracking-wider">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-600 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl py-2.5 text-sm font-medium transition-colors mt-2"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}