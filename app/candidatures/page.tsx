'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Candidatures() {
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
        .select(`
          *,
          candidatures (
            id,
            statut,
            created_at,
            auditeur_id
          )
        `)
        .eq('mandataire_id', data.user.id)
        .order('created_at', { ascending: false })

      setMissions(missionsData || [])
      setLoading(false)
    }
    init()
  }, [])

  const handleAccepter = async (candidatureId: string, missionId: string) => {
    await supabase
      .from('candidatures')
      .update({ statut: 'acceptee' })
      .eq('id', candidatureId)

    await supabase
      .from('missions')
      .update({ statut: 'en_cours' })
      .eq('id', missionId)

    alert('Candidature acceptée ! Contacte l\'auditeur pour l\'appel vidéo.')
    window.location.reload()
  }

  const handleRefuser = async (candidatureId: string) => {
    await supabase
      .from('candidatures')
      .update({ statut: 'refusee' })
      .eq('id', candidatureId)

    window.location.reload()
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
        <a href="/dashboard" className="text-white/40 text-sm hover:text-white transition">← Dashboard</a>
      </header>

      <div className="px-8 py-12 max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-2">Mes missions</h1>
        <p className="text-white/50 mb-10">Gère les candidatures de tes auditeurs</p>

        {loading ? (
          <div className="text-center py-12 text-white/30">Chargement...</div>
        ) : missions.length === 0 ? (
          <div className="bg-white/5 rounded-2xl p-12 border border-white/10 text-center text-white/30">
            <div className="text-5xl mb-4">📋</div>
            <p>Aucune mission publiée</p>
            <a href="/mission" className="inline-block mt-4 px-6 py-3 bg-[#FF6B35] rounded-lg text-white font-bold text-sm hover:bg-[#e55a25] transition">
              Publier une mission
            </a>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {missions.map((mission) => (
              <div key={mission.id} className="bg-white/5 rounded-2xl p-6 border border-white/10">

                {/* Mission header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="font-bold text-xl">{mission.titre}</h2>
                    <p className="text-white/50 text-sm mt-1">{mission.description}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    mission.statut === 'ouverte' ? 'bg-green-500/20 text-green-300' :
                    mission.statut === 'en_cours' ? 'bg-blue-500/20 text-blue-300' :
                    'bg-white/10 text-white/40'
                  }`}>
                    {mission.statut === 'ouverte' ? 'Ouverte' :
                     mission.statut === 'en_cours' ? 'En cours' : 'Terminée'}
                  </span>
                </div>

                {/* Candidatures */}
                <div>
                  <h3 className="text-sm font-bold text-white/60 mb-3">
                    {mission.candidatures?.length || 0} candidature(s)
                  </h3>

                  {!mission.candidatures || mission.candidatures.length === 0 ? (
                    <div className="text-center py-6 text-white/30 text-sm border border-white/10 rounded-xl">
                      Aucune candidature pour le moment
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {mission.candidatures.map((candidature: any) => (
                        <div key={candidature.id} className="flex justify-between items-center bg-white/5 rounded-xl p-4 border border-white/10">
                          <div>
                            <div className="text-sm font-bold">Auditeur</div>
                            <div className="text-white/40 text-xs mt-1">
                              Candidature reçue le {new Date(candidature.created_at).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {candidature.statut === 'en_attente' ? (
                              <>
                                <button
                                  onClick={() => handleRefuser(candidature.id)}
                                  className="px-4 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/10 transition">
                                  Refuser
                                </button>
                                <button
                                  onClick={() => handleAccepter(candidature.id, mission.id)}
                                  className="px-4 py-2 text-sm bg-[#FF6B35] rounded-lg font-bold hover:bg-[#e55a25] transition">
                                  Accepter
                                </button>
                              </>
                            ) : (
                              <span className={`text-xs px-3 py-1 rounded-full ${
                                candidature.statut === 'acceptee' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                              }`}>
                                {candidature.statut === 'acceptee' ? '✅ Acceptée' : '❌ Refusée'}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}