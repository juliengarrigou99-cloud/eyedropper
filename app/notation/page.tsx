'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Notation() {
  const [missionId, setMissionId] = useState('')
  const [auditeurId, setAuditeurId] = useState('')
  const [note, setNote] = useState(5)
  const [commentaire, setCommentaire] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleNoter = async () => {
    setLoading(true)
    setMessage('')

    const { error } = await supabase
      .from('notations')
      .insert({
        mission_id: missionId,
        auditeur_id: auditeurId,
        note,
        commentaire,
      })

    if (error) {
      setMessage('Erreur : ' + error.message)
    } else {
      setMessage('Notation envoyée avec succès !')
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#0A1628] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Noter l'auditeur</h1>
          <p className="text-white/50 mt-2">Ton avis aide la communauté</p>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col gap-6">

          {/* Étoiles */}
          <div>
            <label className="text-sm text-white/60 mb-3 block">Note</label>
            <div className="flex gap-2 justify-center">
              {[1,2,3,4,5].map((etoile) => (
                <button
                  key={etoile}
                  onClick={() => setNote(etoile)}
                  className={`text-4xl transition ${etoile <= note ? 'opacity-100' : 'opacity-30'}`}>
                  ⭐
                </button>
              ))}
            </div>
            <div className="text-center text-white/50 text-sm mt-2">
              {note === 5 ? 'Excellent' : note === 4 ? 'Très bien' : note === 3 ? 'Bien' : note === 2 ? 'Moyen' : 'Insuffisant'}
            </div>
          </div>

          {/* Commentaire */}
          <div>
            <label className="text-sm text-white/60 mb-1 block">Commentaire</label>
            <textarea
              placeholder="Décris ton expérience avec cet auditeur..."
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
              rows={4}
              className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF6B35] transition resize-none"
            />
          </div>

          {message && (
            <div className={`text-sm text-center py-2 px-4 rounded-lg ${message.includes('Erreur') ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
              {message}
            </div>
          )}

          <button
            onClick={handleNoter}
            disabled={loading}
            className="w-full bg-[#FF6B35] hover:bg-[#e55a25] transition rounded-lg py-3 font-bold text-lg disabled:opacity-50">
            {loading ? 'Envoi...' : 'Envoyer la notation'}
          </button>

        </div>
      </div>
    </main>
  )
}