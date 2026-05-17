'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Mission() {
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [adresse, setAdresse] = useState('')
  const [pays, setPays] = useState('')
  const [heures, setHeures] = useState('1')
  const [photos, setPhotos] = useState(false)
  const [videos, setVideos] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const prixTotal = parseInt(heures) * 40
  const commission = prixTotal * 0.30
  const gainAuditeur = prixTotal - commission

  const handleSubmit = async () => {
    setLoading(true)
    setMessage('')

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      window.location.href = '/login'
      return
    }

    const { data: missionData, error } = await supabase
      .from('missions')
      .insert({
        titre,
        description,
        adresse,
        pays,
        heures: parseInt(heures),
        photos_requises: photos,
        videos_requises: videos,
        prix_total: prixTotal,
        statut: 'ouverte',
        mandataire_id: user.id,
      })
      .select()
      .single()

    if (error) {
      setMessage('Erreur : ' + error.message)
      setLoading(false)
      return
    }

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        missionId: missionData.id,
        prixTotal,
        titre,
      }),
    })

    const { url } = await response.json()
    window.location.href = url
  }

  return (
    <main className="min-h-screen bg-[#0A1628] text-white px-4 py-12">
      <div className="max-w-2xl mx-auto">

        <div className="mb-8">
          <a href="/dashboard" className="text-white/40 text-sm hover:text-white transition">← Retour</a>
          <h1 className="text-3xl font-bold mt-4">Publier une mission</h1>
          <p className="text-white/50 mt-1">Décris ce dont tu as besoin</p>
        </div>

        <div className="flex flex-col gap-6">

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h2 className="font-bold mb-4">Informations générales</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-white/60 mb-1 block">Titre de la mission</label>
                <input
                  type="text"
                  placeholder="Ex: Vérification fournisseur textile Bangkok"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF6B35] transition"
                />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-1 block">Description</label>
                <textarea
                  placeholder="Décris précisément ce que tu veux vérifier..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF6B35] transition resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h2 className="font-bold mb-4">Localisation du fournisseur</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-white/60 mb-1 block">Adresse</label>
                <input
                  type="text"
                  placeholder="Adresse exacte du fournisseur"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF6B35] transition"
                />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-1 block">Pays</label>
                <select
                  value={pays}
                  onChange={(e) => setPays(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF6B35] transition">
                  <option value="" className="bg-[#0A1628]">Sélectionne le pays</option>
                  <option value="TH" className="bg-[#0A1628]">🇹🇭 Thaïlande</option>
                  <option value="VN" className="bg-[#0A1628]">🇻🇳 Vietnam</option>
                  <option value="CN" className="bg-[#0A1628]">🇨🇳 Chine</option>
                  <option value="LA" className="bg-[#0A1628]">🇱🇦 Laos</option>
                  <option value="AU" className="bg-[#0A1628]">🇦🇺 Australie</option>
                  <option value="ID" className="bg-[#0A1628]">🇮🇩 Indonésie</option>
                  <option value="other" className="bg-[#0A1628]">🌍 Autre</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h2 className="font-bold mb-4">Durée et médias</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-white/60 mb-1 block">Durée estimée (heures)</label>
                <select
                  value={heures}
                  onChange={(e) => setHeures(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF6B35] transition">
                  {[1,2,3,4,5].map(h => (
                    <option key={h} value={h} className="bg-[#0A1628]">{h} heure{h > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setPhotos(!photos)}
                  className={`flex-1 p-4 rounded-xl border-2 text-center transition ${photos ? 'border-[#FF6B35] bg-[#FF6B35]/10' : 'border-white/10 bg-white/5'}`}>
                  <div className="text-2xl mb-1">📸</div>
                  <div className="text-sm font-bold">Photos requises</div>
                </button>
                <button
                  onClick={() => setVideos(!videos)}
                  className={`flex-1 p-4 rounded-xl border-2 text-center transition ${videos ? 'border-[#FF6B35] bg-[#FF6B35]/10' : 'border-white/10 bg-white/5'}`}>
                  <div className="text-2xl mb-1">🎥</div>
                  <div className="text-sm font-bold">Vidéos requises</div>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h2 className="font-bold mb-4">Récapitulatif</h2>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/50">Durée</span>
                <span>{heures}h × 40€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Commission plateforme (30%)</span>
                <span>{commission}€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Gain auditeur</span>
                <span>{gainAuditeur}€</span>
              </div>
              <div className="border-t border-white/10 my-2"/>
              <div className="flex justify-between text-lg font-bold">
                <span>Total à payer</span>
                <span className="text-[#FF6B35]">{prixTotal}€</span>
              </div>
            </div>
          </div>

          {message && (
            <div className={`text-sm text-center py-3 px-4 rounded-lg ${message.includes('Erreur') ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
              {message}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#FF6B35] hover:bg-[#e55a25] transition rounded-xl py-4 font-bold text-lg disabled:opacity-50">
            {loading ? 'Publication...' : `Publier et payer ${prixTotal}€`}
          </button>

        </div>
      </div>
    </main>
  )
}