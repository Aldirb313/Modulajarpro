import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-indigo-500/25">
            M
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              ModulAjar<span className="text-indigo-400">Pro</span>
            </span>
            <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
              GuruAI OS v1.0
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="px-5 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Daftar Gratis
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 lg:px-12 py-20 text-center relative overflow-hidden">
        {/* Decorative Glow Elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-indigo-300 mb-8 backdrop-blur-sm shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Platform AI Asisten Pengajaran Terlengkap untuk Guru Indonesia</span>
        </div>

        {/* Main Title */}
        <h1 className="max-w-4xl text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
          Guru Mengajar,{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
            AI Menyiapkan Semuanya.
          </span>
        </h1>

        <p className="max-w-2xl text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed">
          Buat Modul Ajar, ATP, CP, RPP, LKPD, hingga Game & Komik Edukasi dalam hitungan detik. Terstruktur, otomatis, dan sesuai Kurikulum Merdeka.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16 z-10">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 text-base font-bold rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-95 text-white shadow-xl shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Buka Dashboard Guru</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          <Link
            href="/modules/new"
            className="w-full sm:w-auto px-8 py-4 text-base font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-all flex items-center justify-center gap-2"
          >
            <span>Buat Modul Instan</span>
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full text-left mt-8 z-10">
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm hover:border-indigo-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Modul Ajar & ATP Auto-AI</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Generasi perangkat pembelajaran lengkap (CP, TP, ATP, Modul Ajar, RPP) sesuai standar Kemendikbudristek secara otomatis.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm hover:border-purple-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
              🎯
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Smart Rewrite & Custom Adaptor</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Sesuaikan pendekatan mengajar: Nasional, Berbasis PjBL, STEM, Islami, hingga gaya Merdeka Belajar sesuai kebutuhan murid.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm hover:border-pink-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
              🎮
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Media Pembelajaran WOW Generator</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Buat Quiz Game, Komik Edukasi, Cerita Bergambar, Flashcard, hingga Bahan Presentasi PPT tanpa repot desah desik.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 px-6 lg:px-12 py-8 text-center text-xs text-slate-500 bg-slate-950">
        <p>© 2026 Modul Ajar Pro (GuruAI OS). Hak Cipta Dilindungi Undang-Undang.</p>
      </footer>
    </div>
  );
}
