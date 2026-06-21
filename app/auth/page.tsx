'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'https://teamdolly.co.za/admin'
      }
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Check your email for the login link')
    }
    setLoading(false)
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
              className="w-full bg-[#171717] border border-[#2a2a2a] rounded px-4 py-3 text-white focus:border-[#ff2d78] focus:outline-none"
              placeholder="admin@daflame.co.za"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff2d78] text-white py-3 rounded font-semibold tracking-widest uppercase hover:bg-[#e0135f] transition disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-center text-[#888]">{message}</p>
        )}
      </div>
    </main>
  )
}