export default function Register() {
  return (
    <main className="min-h-screen bg-[#0A1628] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-1">
            <span className="text-[#FF6B35] font-bold text-2xl italic">e</span>
            <span className="text-white font-bold text-2xl italic">yedropper</span>
          </a>
          <p className="text-white/50 mt-2">Crée ton compte gratuitement</p>
        </div>

        {/* Choix du rôle */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="p-4 rounded-xl border-2 border-[#FF6B35] bg-[#FF6B35]/10 text-center">
            <div className="text-2xl mb-1">🎒</div>
            <div className="font-bold text-sm">Auditeur</div>
            <div className="text-white/40 text-xs mt-1">Je voyage et j'exécute des missions</div>
          </button>
          <button className="p-4 rounded-xl border-2 border-white/10 bg-white/5 text-center hover:border-white/30 transition">
            <div className="text-2xl mb-1">🛒</div>
            <div className="font-bold text-sm">Mandataire</div>
            <div className="text-white/40 text-xs mt-1">Je vends en ligne et je commande des audits</div>
          </button>
        </div>

        {/* Formulaire */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <div className="flex flex-col gap-4">
            
            <div>
              <label className="text-sm text-white/60 mb-1 block">Prénom</label>
              <input 
                type="text"
                placeholder="Julien"
                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF6B35] transition"
              />
            </div>

            <div>
              <label className="text-sm text-white/60 mb-1 block">Email</label>
              <input 
                type="email"
                placeholder="julien@email.com"
                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF6B35] transition"
              />
            </div>

            <div>
              <label className="text-sm text-white/60 mb-1 block">Mot de passe</label>
              <input 
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF6B35] transition"
              />
            </div>

            <div>
              <label className="text-sm text-white/60 mb-1 block">Pays actuel</label>
              <select className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF6B35] transition">
                <option value="" className="bg-[#0A1628]">Sélectionne ton pays</option>
                <option value="TH" className="bg-[#0A1628]">🇹🇭 Thaïlande</option>
                <option value="VN" className="bg-[#0A1628]">🇻🇳 Vietnam</option>
                <option value="LA" className="bg-[#0A1628]">🇱🇦 Laos</option>
                <option value="AU" className="bg-[#0A1628]">🇦🇺 Australie</option>
                <option value="ID" className="bg-[#0A1628]">🇮🇩 Indonésie</option>
                <option value="FR" className="bg-[#0A1628]">🇫🇷 France</option>
                <option value="ES" className="bg-[#0A1628]">🇪🇸 Espagne</option>
                <option value="other" className="bg-[#0A1628]">🌍 Autre</option>
              </select>
            </div>

            <button className="w-full bg-[#FF6B35] hover:bg-[#e55a25] transition rounded-lg py-3 font-bold text-lg mt-2">
              Créer mon compte
            </button>

          </div>
        </div>

        <p className="text-center text-white/30 text-sm mt-4">
          Déjà un compte ? <a href="/login" className="text-[#FF6B35] hover:underline">Se connecter</a>
        </p>

      </div>
    </main>
  )
}