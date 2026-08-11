import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Dynamic Animated Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-indigo-600/30 via-purple-600/20 to-pink-600/30 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none animate-float-delayed" />
      <div className="absolute top-40 left-10 w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none animate-float" />

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-indigo-500/30 hover:scale-105 transition-transform">
            M
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
              Modulajarpro
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 -mt-1 animate-gradient-text">
              by Aldirb354
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <Link
            href="/login"
            className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white transition-colors"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="relative group overflow-hidden px-5 py-2.5 text-xs font-extrabold rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Daftar Gratis</span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 animate-shimmer" />
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 lg:px-12 py-20 text-center relative z-10">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-indigo-500/30 text-xs text-indigo-300 mb-8 backdrop-blur-md shadow-xl hover:border-indigo-500/60 transition-all animate-float">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold">Operating System & AI Assistant Terlengkap untuk Guru Indonesia</span>
        </div>

        {/* Main Title */}
        <h1 className="max-w-5xl text-4xl sm:text-7xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
          Guru Mengajar,{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 animate-gradient-text">
            AI Menyiapkan Semuanya.
          </span>
        </h1>

        <p className="max-w-2xl text-base sm:text-xl text-slate-400 mb-10 leading-relaxed">
          Otomatisasi pembuatan Modul Ajar, ATP, CP, RPP, LKPD, hingga Game & Komik Edukasi dalam 5 menit. Terstruktur, instan, dan sesuai standar Kurikulum Merdeka.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <Link
            href="/dashboard"
            className="relative group overflow-hidden w-full sm:w-auto px-8 py-4 text-base font-extrabold rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-2xl shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
          >
            <span className="relative z-10">Buka Workspace Guru</span>
            <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-shimmer" />
          </Link>

          <Link
            href="/copilot"
            className="w-full sm:w-auto px-8 py-4 text-base font-bold rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-purple-500/50 transition-all backdrop-blur-sm flex items-center justify-center gap-2 shadow-lg"
          >
            <span>🧠 Tanya Copilot AI</span>
          </Link>
        </div>

        {/* Floating WOW Feature Showcase Cards (Relate untuk Guru Profesional) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full text-left mt-6">
          {/* Card 1: Interactive Lesson Assistant */}
          <div className="p-7 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl hover:border-indigo-500/60 transition-all group animate-float shadow-2xl hover:shadow-indigo-500/10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold text-2xl mb-5 group-hover:scale-110 transition-transform shadow-inner">
              📚
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">Pedagogi Otomatis</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">Modul Ajar & ATP Auto-AI</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generasi perangkat pembelajaran lengkap (CP, TP, ATP, Modul Ajar, RPP) sesuai standar Kemendikbudristek secara instan.
            </p>
          </div>

          {/* Card 2: Teacher Copilot Knowledge Base */}
          <div className="p-7 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl hover:border-purple-500/60 transition-all group animate-float-delayed shadow-2xl hover:shadow-purple-500/10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center font-bold text-2xl mb-5 group-hover:scale-110 transition-transform shadow-inner">
              🧠
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">Knowledge Base Buku</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">Teacher Copilot Assistant</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload PDF/DOCX buku pelajaran. AI membaca dokumen Anda untuk langsung membuatkan kuis bab, LKPD, hingga Ice Breaking kelas.
            </p>
          </div>

          {/* Card 3: School Operating System */}
          <div className="p-7 rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl hover:border-pink-500/60 transition-all group animate-float shadow-2xl hover:shadow-pink-500/10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500/20 to-pink-500/10 border border-pink-500/30 text-pink-400 flex items-center justify-center font-bold text-2xl mb-5 group-hover:scale-110 transition-transform shadow-inner">
              🏫
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-pink-400 bg-pink-950 px-2 py-0.5 rounded border border-pink-800">Enterprise School OS</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">School OS & Analytics</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dashboard Kepala Sekolah untuk supervisi aktivitas guru, seragamkan template Modul/LKPD sekolah, & approval bot WA/Telegram.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900/80 px-6 lg:px-12 py-8 text-center text-xs text-slate-500 bg-slate-950/90 relative z-10 backdrop-blur-md">
        <p>© 2026 Modulajarpro by Aldirb354. Operating System Pendidikan Indonesia.</p>
      </footer>
    </div>
  );
}
