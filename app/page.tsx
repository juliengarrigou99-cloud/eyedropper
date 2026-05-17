import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A1628] text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-[#FF6B35] font-bold text-2xl italic">e</span>
          <span className="text-white font-bold text-2xl italic">yedropper</span>
        </div>
        <nav className="flex gap-6 text-sm text-white/70">
          <a href="#comment" className="hover:text-white transition">Comment ça marche</a>
          <a href="#missions" className="hover:text-white transition">Missions</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </nav>
        <div className="flex gap-3">
          <Link href="/login" className="px-4 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/10 transition">
            Connexion
          </Link>
          <Link href="/register" className="px-4 py-2 text-sm bg-[#FF6B35] rounded-lg hover:bg-[#e55a25] transition">
            S'inscrire
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-8 py-24">
        <span className="text-[#00D4FF] text-sm font-mono tracking-widest mb-4">EYES ON THE GROUND</span>
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Gagne de l'argent<br />
          <span className="text-[#FF6B35]">en voyageant</span>
        </h1>
        <p className="text-white/60 text-lg max-w-xl mb-10">
          EyeDropper connecte les vendeurs en ligne avec des backpackers sur le terrain.
          Visite des fournisseurs, fais un rapport — et sois payé jusqu'à 140€ par mission.
        </p>
        <div className="flex gap-4">
          <Link href="/register" className="px-8 py-4 bg-[#FF6B35] rounded-xl font-bold text-lg hover:bg-[#e55a25] transition">
            Devenir auditeur
          </Link>
          <Link href="/mission" className="px-8 py-4 border border-white/20 rounded-xl font-bold text-lg hover:bg-white/10 transition">
            Poster une mission
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-6 px-16 py-12 border-y border-white/10">
        {[
          { value: "28€", label: "Par heure en moyenne" },
          { value: "140€", label: "Par mission complète" },
          { value: "100%", label: "Paiement garanti" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-4xl font-bold text-[#FF6B35]">{stat.value}</div>
            <div className="text-white/50 mt-1">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Comment ça marche */}
      <section id="comment" className="px-16 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche</h2>
        <div className="grid grid-cols-3 gap-8">
          {[
            { num: "01", title: "Inscris-toi", desc: "Crée ton profil gratuitement en 2 minutes. Indique ta localisation et tes disponibilités." },
            { num: "02", title: "Choisis une mission", desc: "Parcours les missions disponibles près de toi. Postule à celles qui t'intéressent." },
            { num: "03", title: "Sois payé", desc: "Exécute la mission, soumets ton rapport avec photos et géolocalisation. Paiement immédiat." },
          ].map((step) => (
            <div key={step.num} className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="text-[#FF6B35] font-mono text-sm mb-3">{step.num}</div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-white/50 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-white/10 text-white/30 text-sm">
        © 2026 EyeDropper — Eyes on the Ground
      </footer>
    </main>
  )
}