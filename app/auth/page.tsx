'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
      setLoading(false)
    } else if (data.session) {
      // Successfully authenticated, push straight to the clean dashboard!
      router.push('/admin')
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8] font-sans flex items-center justify-center">
      <div className="max-w-md w-full px-6">
        <h1 className="font-['Bebas_Neue'] text-4xl text-white mb-2">Admin Login</h1>
        <p className="text-[#888] text-sm mb-8">Team Dolly / Daflame (PTY) Ltd</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-[#888] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-[#171717] border border-[#2a2a2a] rounded px-4 py-3 text-white focus:border-[#ff2d78] focus:outline-none transition-colors"
              placeholder="admin@daflame.co.za"
            />
          </div>

          <div>
            <label className="block text-sm text-[#888] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full bg-[#171717] border border-[#2a2a2a] rounded px-4 py-3 text-white focus:border-[#ff2d78] focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff2d78] text-white py-3 rounded font-semibold tracking-widest uppercase hover:bg-[#e0135f] transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-center text-[#ff2d78] bg-[#ff2d78]/10 py-2 px-4 rounded border border-[#ff2d78]/20">
            {message}
          </p>
        )}
      </div>
    </main>
  )
}