'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleLogin = async () => {
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage('Erreur : ' + error.message)
    } else {
      window.location.href = '/dashboard'
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#0A1628] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-1">
            <span className="text-[#FF6B35] font-bold text-2xl italic">e</span>
            <span className="text-white font-bold text-2xl italic">yedropper</span>
          </a>
          <p className="text-white/50 mt-2">Connecte-toi à ton compte</p>
        </div>

        {/* Formulaire */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <div className="flex flex-col gap-4">

            <div>
              <label className="text-sm text-white/60 mb-1 block">Email</label>
              <input
                type="email"
                placeholder="julien@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF6B35] transition"
              />
            </div>

            <div>
              <label className="text-sm text-white/60 mb-1 block">Mot de passe</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF6B35] transition"
              />
            </div>

            {message && (
              <div className={`text-sm text-center py-2 px-4 rounded-lg ${message.includes('Erreur') ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
                {message}
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#FF6B35] hover:bg-[#e55a25] transition rounded-lg py-3 font-bold text-lg mt-2 disabled:opacity-50">
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>

          </div>
        </div>

        <p className="text-center text-white/30 text-sm mt-4">
          Pas encore de compte ? <a href="/register" className="text-[#FF6B35] hover:underline">S'inscrire</a>
        </p>

      </div>
    </main>
  )
}