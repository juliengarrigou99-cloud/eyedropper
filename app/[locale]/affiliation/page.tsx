'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Affiliation() {
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    setMessage('')

    const { error } = await supabase
      .from('affiliations')
      .insert({
        nom,
        email,
        code: code.toLowerCase().replace(/\s/g, ''),
        statut: 'en_attente',
      })

    if (error) {
      setMessage('Erreur : ' + error.message)
    } else {
      setMessage('Demande envoyée ! Tu recevras une confirmation par email.')
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#0A1628] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-1">
            <span className="text-[#FF6B35] font-bold text-2xl italic">e</span>
            <span className="text-white font-bold text-2xl italic">yedropper</span>
          </a>
          <h1 className="text-2xl font-bold mt-4">Devenir affilié</h1>
          <p className="text-white/50 mt-2">Gagne 20% sur chaque mission référée</p>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col gap-4">

          <div>
            <label className="text-sm text-white/60 mb-1 block">Ton nom / nom de chaîne</label>
            <input
              type="text"
              placeholder="Ex: MonPseudo"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF6B35] transition"
            />
          </div>

          <div>
            <label className="text-sm text-white/60 mb-1 block">Email</label>
            <input
              type="email"
              placeholder="contact@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF6B35] transition"
            />
          </div>

          <div>
            <label className="text-sm text-white/60 mb-1 block">Ton code affilié souhaité</label>
            <input
              type="text"
              placeholder="Ex: monpseudo"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF6B35] transition"
            />
            {code && (
              <p className="text-white/30 text-xs mt-1">
                Ton lien : eyedropper.io/fr?ref={code.toLowerCase().replace(/\s/g, '')}
              </p>
            )}
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 className="font-bold text-sm mb-2">Ce que tu gagnes</h3>
            <div className="flex flex-col gap-1 text-sm text-white/50">
              <span>✓ 20% sur chaque mission référée</span>
              <span>✓ Tableau de bord en temps réel</span>
              <span>✓ Paiement mensuel via Wise</span>
            </div>
          </div>

          {message && (
            <div className={`text-sm text-center py-2 px-4 rounded-lg ${message.includes('Erreur') ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
              {message}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#FF6B35] hover:bg-[#e55a25] transition rounded-lg py-3 font-bold text-lg disabled:opacity-50">
            {loading ? 'Envoi...' : 'Envoyer ma demande'}
          </button>

        </div>

        <p className="text-center text-white/30 text-sm mt-4">
          Validation sous 48h — on vérifie chaque demande manuellement.
        </p>

      </div>
    </main>
  )
}