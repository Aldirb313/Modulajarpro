"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function MarketplaceAndGamificationPage() {
  const [activeTab, setActiveTab] = useState<"marketplace" | "gamification" | "approval">("marketplace");
  const [userXp, setUserXp] = useState(1450);
  const [approvalSent, setApprovalSent] = useState(false);

  const triggerApproval = (actionName: string) => {
    setApprovalSent(true);
    setTimeout(() => setApprovalSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/90 px-6 py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700">
            ← Dashboard
          </Link>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg text-white">AI Marketplace & Approval Center</span>
            <span className="text-[10px] font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 -mt-1">
              by Aldirb354
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab("marketplace")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "marketplace" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            🏪 AI Marketplace Template
          </button>
          <button
            onClick={() => setActiveTab("gamification")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "gamification" ? "bg-purple-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            🏆 Gamifikasi & XP Guru
          </button>
          <button
            onClick={() => setActiveTab("approval")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "approval" ? "bg-emerald-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            📲 Approval Center WA/Telegram
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl w-full mx-auto p-6 flex-1 flex flex-col gap-8">
        {/* TAB 1: AI Marketplace */}
        {activeTab === "marketplace" && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-white">AI Template Marketplace Guru</h1>
                <p className="text-xs text-slate-400">Jual dan beli template Modul Ajar, LKPD, Soal, & PPT buatan Anda ke sesama guru se-Indonesia!</p>
              </div>
              <button className="bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg">
                + Jual Template Anda
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 border-b border-slate-800 pb-3 text-xs">
              <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg font-bold">Semua (1,420)</span>
              <span className="bg-slate-900 text-slate-400 hover:text-white px-3 py-1 rounded-lg">Modul Ajar</span>
              <span className="bg-slate-900 text-slate-400 hover:text-white px-3 py-1 rounded-lg">LKPD</span>
              <span className="bg-slate-900 text-slate-400 hover:text-white px-3 py-1 rounded-lg">Bank Soal</span>
              <span className="bg-slate-900 text-slate-400 hover:text-white px-3 py-1 rounded-lg">PPT Slide</span>
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* ITEM 1 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-indigo-500/50 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">Modul Ajar PjBL</span>
                    <span className="text-xs font-bold text-amber-400">★ 4.9 (128 Reviews)</span>
                  </div>
                  <h3 className="font-bold text-white text-base">Modul Ajar Biologi SMA - Sistem Imunisasi & Virus</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">Lengkap dengan Rubrik Penilaian Proyek, Lembar Kerja Praktikum, & Media Interaktif.</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                    <div className="w-5 h-5 rounded-full bg-purple-600 text-[10px] flex items-center justify-center font-bold text-white">SR</div>
                    <span>Oleh: Siti Rahma, M.Pd.</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-emerald-400">Rp 25.000</span>
                  <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl text-xs font-bold text-white">Beli Template</button>
                </div>
              </div>

              {/* ITEM 2 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-purple-500/50 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">LKPD Interaktif</span>
                    <span className="text-xs font-bold text-amber-400">★ 5.0 (94 Reviews)</span>
                  </div>
                  <h3 className="font-bold text-white text-base">LKPD Matematika SD - Bangun Datar & Sudut</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">Desain visual ceria anak, kuis bergambar, dan kunci jawaban guru.</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                    <div className="w-5 h-5 rounded-full bg-indigo-600 text-[10px] flex items-center justify-center font-bold text-white">BS</div>
                    <span>Oleh: Budi Santoso, S.Pd.</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-emerald-400">Rp 15.000</span>
                  <button className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-xl text-xs font-bold text-white">Beli Template</button>
                </div>
              </div>

              {/* ITEM 3 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-pink-500/50 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-pink-400 bg-pink-950 px-2 py-0.5 rounded border border-pink-800">Presentasi PPT</span>
                    <span className="text-xs font-bold text-amber-400">★ 4.8 (210 Reviews)</span>
                  </div>
                  <h3 className="font-bold text-white text-base">Slide PPT Animasi - Fisika Listrik Statis & Dinamis</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">25 Slide animasi interaktif siap pakai untuk mengajar kelas 12 SMA.</p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                    <div className="w-5 h-5 rounded-full bg-pink-600 text-[10px] flex items-center justify-center font-bold text-white">AF</div>
                    <span>Oleh: Ahmad Fauzi, S.T.</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-lg font-extrabold text-emerald-400">Rp 35.000</span>
                  <button className="bg-pink-600 hover:bg-pink-500 px-4 py-2 rounded-xl text-xs font-bold text-white">Beli Template</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Gamifikasi & XP Guru */}
        {activeTab === "gamification" && (
          <div className="flex flex-col gap-6">
            {/* User XP Header Banner */}
            <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-800/80 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-3xl shadow-lg">
                  👑
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xl text-white">Tingkat Guru: Master Innovator</span>
                    <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/30">Level 8</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">🔥 14 Hari Streak Mengajar Berturut-Turut!</p>
                </div>
              </div>

              <div className="w-full md:w-64">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-purple-300">XP Mengajar</span>
                  <span className="text-white">{userXp} / 2,000 XP</span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" style={{ width: "72%" }} />
                </div>
              </div>
            </div>

            {/* Badges Grid */}
            <h2 className="text-lg font-bold text-white mt-2">Lencana Achievement Guru</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-indigo-800/60 p-4 rounded-2xl flex flex-col items-center text-center">
                <span className="text-3xl mb-2">⚡</span>
                <h4 className="font-bold text-white text-xs">AI Pioneer</h4>
                <p className="text-[10px] text-slate-400 mt-1">Generate 50+ Modul Ajar AI</p>
                <span className="mt-3 text-[9px] bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded-full font-bold">TERBuka ✓</span>
              </div>

              <div className="bg-slate-900 border border-purple-800/60 p-4 rounded-2xl flex flex-col items-center text-center">
                <span className="text-3xl mb-2">🎨</span>
                <h4 className="font-bold text-white text-xs">Media Wizard</h4>
                <p className="text-[10px] text-slate-400 mt-1">Buat 10+ Game & Komik</p>
                <span className="mt-3 text-[9px] bg-purple-950 text-purple-300 border border-purple-800 px-2 py-0.5 rounded-full font-bold">TERBuka ✓</span>
              </div>

              <div className="bg-slate-900 border border-emerald-800/60 p-4 rounded-2xl flex flex-col items-center text-center">
                <span className="text-3xl mb-2">🤝</span>
                <h4 className="font-bold text-white text-xs">Top Contributor</h4>
                <p className="text-[10px] text-slate-400 mt-1">Berbagi 20+ Template Sekolah</p>
                <span className="mt-3 text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full font-bold">TERBuka ✓</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col items-center text-center opacity-60">
                <span className="text-3xl mb-2">💎</span>
                <h4 className="font-bold text-white text-xs">Market Legend</h4>
                <p className="text-[10px] text-slate-400 mt-1">Jual 100+ Template di Market</p>
                <span className="mt-3 text-[9px] bg-slate-950 text-slate-500 border border-slate-800 px-2 py-0.5 rounded-full font-bold">Terkunci (68/100)</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Approval Center WA & Telegram */}
        {activeTab === "approval" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-extrabold text-white mb-1">📲 Enterprise Approval Center (WA & Telegram)</h2>
              <p className="text-xs text-slate-400">Notifikasi & Konfirmasi Otomatis ke WhatsApp/Telegram Kepala Sekolah atau Admin untuk Aktivitas Penting.</p>
            </div>

            {approvalSent && (
              <div className="bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs p-4 rounded-xl flex items-center gap-3 animate-bounce">
                <span>📲</span>
                <span>Notifikasi Approval Berhasil Dikirim ke WhatsApp Kepala Sekolah & Telegram Admin!</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">1. Export Massal Dokumen Sekolah</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Membutuhkan Approval Kepala Sekolah via WA Bot</p>
                </div>
                <button
                  onClick={() => triggerApproval("Export Massal")}
                  className="bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 rounded-xl text-xs font-bold text-white shrink-0"
                >
                  Kirim Approval WA
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">2. Publish Materi ke Marketplace</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Notifikasi Verifikasi Konten Guru</p>
                </div>
                <button
                  onClick={() => triggerApproval("Publish Materi")}
                  className="bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 rounded-xl text-xs font-bold text-white shrink-0"
                >
                  Kirim Approval WA
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">3. Berbagi Perangkat ke Seluruh Sekolah</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Konfirmasi Admin Sekolah via Telegram</p>
                </div>
                <button
                  onClick={() => triggerApproval("Berbagi Sekolah")}
                  className="bg-blue-600 hover:bg-blue-500 px-3.5 py-2 rounded-xl text-xs font-bold text-white shrink-0"
                >
                  Kirim Telegram Bot
                </button>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">4. Perubahan Billing & Penambahan User</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Notifikasi Transaksi Finansial Sekolah</p>
                </div>
                <button
                  onClick={() => triggerApproval("Perubahan Billing")}
                  className="bg-blue-600 hover:bg-blue-500 px-3.5 py-2 rounded-xl text-xs font-bold text-white shrink-0"
                >
                  Kirim Telegram Bot
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
