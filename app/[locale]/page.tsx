import {useTranslations} from 'next-intl'
import Link from 'next/link'

export default function Home({params: {locale}}: {params: {locale: string}}) {
  const t = useTranslations()

  return (
    <main className="min-h-screen bg-[#0A1628] text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-[#FF6B35] font-bold text-2xl italic">e</span>
          <span className="text-white font-bold text-2xl italic">yedropper</span>
        </div>
        <nav className="flex gap-6 text-sm text-white/70">
          <a href="#comment" className="hover:text-white transition">{t('nav.comment')}</a>
          <a href="#missions" className="hover:text-white transition">{t('nav.missions')}</a>
          <a href="#contact" className="hover:text-white transition">{t('nav.contact')}</a>
        </nav>
        <div className="flex gap-3">
          <Link href="/login" className="px-4 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/10 transition">
            {t('nav.connexion')}
          </Link>
          <Link href="/register" className="px-4 py-2 text-sm bg-[#FF6B35] rounded-lg hover:bg-[#e55a25] transition">
            {t('nav.inscrire')}
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-8 py-24">
        <span className="text-[#00D4FF] text-sm font-mono tracking-widest mb-4">{t('hero.tagline')}</span>
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          {t('hero.titre')}<br />
          <span className="text-[#FF6B35]">{t('hero.titre2')}</span>
        </h1>
        <p className="text-white/60 text-lg max-w-xl mb-10">
          {t('hero.description')}
        </p>
        <div className="flex gap-4">
          <Link href="/register" className="px-8 py-4 bg-[#FF6B35] rounded-xl font-bold text-lg hover:bg-[#e55a25] transition">
            {t('hero.auditeur')}
          </Link>
          <Link href="/mission" className="px-8 py-4 border border-white/20 rounded-xl font-bold text-lg hover:bg-white/10 transition">
            {t('hero.mission')}
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-6 px-16 py-12 border-y border-white/10">
        {[
          { value: "28€", label: t('stats.heure') },
          { value: "140€", label: t('stats.mission') },
          { value: "100%", label: t('stats.paiement') },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-4xl font-bold text-[#FF6B35]">{stat.value}</div>
            <div className="text-white/50 mt-1">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Comment ça marche */}
      <section id="comment" className="px-16 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">{t('comment.titre')}</h2>
        <div className="grid grid-cols-3 gap-8">
          {[
            { num: "01", title: t('comment.etape1titre'), desc: t('comment.etape1desc') },
            { num: "02", title: t('comment.etape2titre'), desc: t('comment.etape2desc') },
            { num: "03", title: t('comment.etape3titre'), desc: t('comment.etape3desc') },
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