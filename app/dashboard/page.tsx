'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [missions, setMissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        window.location.href = '/login'
        return
      }
      setUser(data.user)

      const { data: missionsData } = await supabase
        .from('missions')
        .select('*')
        .eq('statut', 'ouverte')
        .order('created_at', { ascending: false })

      setMissions(missionsData || [])
      setLoading(false)
    }
    init()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const handlePostuler = async (missionId: string) => {
    const { error } = await supabase
      .from('candidatures')
      .insert({
        mission_id: missionId,
        auditeur_id: user.id,
        statut: 'en_attente',
      })

    if (error) {
      alert('Erreur : ' + error.message)
    } else {
      alert('Candidature envoyée ! Le mandataire va te contacter.')
    }
  }

  const paysLabel: Record<string, string> = {
    TH: '🇹🇭 Thaïlande',
    VN: '🇻🇳 Vietnam',
    CN: '🇨🇳 Chine',
    LA: '🇱🇦 Laos',
    AU: '🇦🇺 Australie',
    ID: '🇮🇩 Indonésie',
    other: '🌍 Autre',
  }

  if (!user) return (
    <main className="min-h-screen bg-[#0A1628] flex items-center justify-center">
      <div className="text-white/50">Chargement...</div>
    </main>
  )

  return (
    <main className="min-h-screen bg-[#0A1628] text-white">

      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-[#FF6B35] font-bold text-2xl italic">e</span>
          <span className="text-white font-bold text-2xl italic">yedropper</span>
        </div>
        <div className="flex items-center gap-4">
<a href="/candidatures" className="px-4 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/10 transition">
  Mes missions
</a>
<a href="/mission" className="px-4 py-2 text-sm bg-[#FF6B35] rounded-lg hover:bg-[#e55a25] transition font-bold">
  + Publier une mission
</a>
          <span className="text-white/50 text-sm">{user.email}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/10 transition">
            Déconnexion
          </button>
        </div>
      </header>

      {/* Contenu */}
      <div className="px-8 py-12 max-w-6xl mx-auto">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {[
            { label: "Missions disponibles", value: missions.length.toString(), icon: "📋" },
            { label: "Missions complétées", value: "0", icon: "✅" },
            { label: "Gains totaux", value: "0€", icon: "💶" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold text-[#FF6B35]">{stat.value}</div>
              <div className="text-white/50 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Liste missions */}
        <div>
          <h2 className="text-xl font-bold mb-6">Missions disponibles</h2>

          {loading ? (
            <div className="text-center py-12 text-white/30">Chargement...</div>
          ) : missions.length === 0 ? (
            <div className="bg-white/5 rounded-2xl p-12 border border-white/10 text-center text-white/30">
              <div className="text-5xl mb-4">🎒</div>
              <p>Aucune mission disponible pour le moment</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {missions.map((mission) => (
                <div key={mission.id} className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#FF6B35]/50 transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg">{mission.titre}</h3>
                        <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">Ouverte</span>
                      </div>
                      <p className="text-white/50 text-sm mb-3">{mission.description}</p>
                      <div className="flex gap-4 text-sm text-white/40">
                        <span>{paysLabel[mission.pays] || mission.pays}</span>
                        <span>⏱ {mission.heures}h</span>
                        {mission.photos_requises && <span>📸 Photos</span>}
                        {mission.videos_requises && <span>🎥 Vidéos</span>}
                      </div>
                    </div>
                    <div className="text-right ml-6">
                      <div className="text-2xl font-bold text-[#FF6B35]">{mission.prix_total * 0.7}€</div>
                      <div className="text-white/40 text-xs mt-1">ton gain</div>
                      <button
                        onClick={() => handlePostuler(mission.id)}
                        className="mt-3 px-4 py-2 bg-[#FF6B35] rounded-lg text-sm font-bold hover:bg-[#e55a25] transition">
                        Postuler
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}