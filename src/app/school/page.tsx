"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SchoolOperatingSystemPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "templates" | "collaboration" | "analytics">("dashboard");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/90 px-6 py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700">
            ← Dashboard
          </Link>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg text-white">School Operating System (School OS)</span>
            <span className="text-[10px] font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 -mt-1">
              by Aldirb354
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "dashboard" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            📊 Dashboard Kepsek
          </button>
          <button
            onClick={() => setActiveTab("templates")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "templates" ? "bg-purple-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            📋 Template Sekolah
          </button>
          <button
            onClick={() => setActiveTab("collaboration")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "collaboration" ? "bg-pink-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            🤝 Hub Kolaborasi Guru
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "analytics" ? "bg-emerald-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            🤖 AI Analytics & Insights
          </button>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-7xl w-full mx-auto p-6 flex-1 flex flex-col gap-6">
        {/* TAB 1: Dashboard Kepala Sekolah */}
        {activeTab === "dashboard" && (
          <div className="flex flex-col gap-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <span className="text-xs text-slate-400 font-medium">Aktivitas Guru Aktif</span>
                <div className="text-3xl font-extrabold text-white mt-1">48 / 52</div>
                <span className="text-[10px] text-emerald-400 font-semibold mt-2 inline-block">↑ 92% Keaktifan Minggu Ini</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <span className="text-xs text-slate-400 font-medium">Total Perangkat Pembelajaran</span>
                <div className="text-3xl font-extrabold text-indigo-400 mt-1">342 Dokumen</div>
                <span className="text-[10px] text-slate-500 mt-2 inline-block">Modul, LKPD, & Assessment</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <span className="text-xs text-slate-400 font-medium">Statistik Penggunaan AI</span>
                <div className="text-3xl font-extrabold text-purple-400 mt-1">1,280 Generasi</div>
                <span className="text-[10px] text-purple-300 font-semibold mt-2 inline-block">Hemat ~350 Jam Kerja Guru</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                <span className="text-xs text-slate-400 font-medium">Skor Kepatuhan Kurikulum</span>
                <div className="text-3xl font-extrabold text-emerald-400 mt-1">98.4%</div>
                <span className="text-[10px] text-emerald-300 font-semibold mt-2 inline-block">Sesuai Standar Kemendikbud</span>
              </div>
            </div>

            {/* Teacher Activity Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="font-bold text-lg text-white mb-4">Aktivitas & Pembuatan Materi Guru (Real-Time)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Nama Guru</th>
                      <th className="py-3 px-4">Mata Pelajaran</th>
                      <th className="py-3 px-4">Jumlah Modul & LKPD</th>
                      <th className="py-3 px-4">Penggunaan AI Copilot</th>
                      <th className="py-3 px-4">Status Verifikasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    <tr>
                      <td className="py-3.5 px-4 font-semibold text-white">Budi Santoso, S.Pd.</td>
                      <td className="py-3.5 px-4 text-slate-400">Matematika SMP</td>
                      <td className="py-3.5 px-4 text-indigo-400 font-bold">18 Dokumen</td>
                      <td className="py-3.5 px-4 text-purple-400">84 Kali</td>
                      <td className="py-3.5 px-4"><span className="bg-emerald-950 text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-emerald-800">Terverifikasi</span></td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-semibold text-white">Siti Rahma, M.Pd.</td>
                      <td className="py-3.5 px-4 text-slate-400">IPA Biologi SMA</td>
                      <td className="py-3.5 px-4 text-indigo-400 font-bold">24 Dokumen</td>
                      <td className="py-3.5 px-4 text-purple-400">112 Kali</td>
                      <td className="py-3.5 px-4"><span className="bg-emerald-950 text-emerald-400 text-xs px-2.5 py-1 rounded-full border border-emerald-800">Terverifikasi</span></td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-semibold text-white">Ahmad Fauzi, S.T.</td>
                      <td className="py-3.5 px-4 text-slate-400">Informatika SMK</td>
                      <td className="py-3.5 px-4 text-indigo-400 font-bold">15 Dokumen</td>
                      <td className="py-3.5 px-4 text-purple-400">65 Kali</td>
                      <td className="py-3.5 px-4"><span className="bg-amber-950 text-amber-400 text-xs px-2.5 py-1 rounded-full border border-amber-800">Perlu Review</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Template Standar Sekolah */}
        {activeTab === "templates" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg mb-4">📄</div>
                <h3 className="font-bold text-lg text-white mb-2">Standar Modul Ajar Sekolah</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">Template resmi Modul Ajar Kurikulum Merdeka yang dikunci sesuai format Yayasan/Sekolah.</p>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white transition-all">Terapkan Standar Modul</button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-lg mb-4">📑</div>
                <h3 className="font-bold text-lg text-white mb-2">Standar LKPD Interaktif</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">Template Lembar Kerja Siswa terstruktur lengkap dengan Rubrik Penilaian Differentiated Learning.</p>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-xs text-white transition-all">Terapkan Standar LKPD</button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-lg mb-4">📊</div>
                <h3 className="font-bold text-lg text-white mb-2">Standar Penilaian & Asesmen</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">Format kisi-kisi Bank Soal, Asesmen Formatif, & Sumatif yang diseragamkan satu sekolah.</p>
              </div>
              <button className="w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 font-bold text-xs text-white transition-all">Terapkan Standar Penilaian</button>
            </div>
          </div>
        )}

        {/* TAB 3: Hub Kolaborasi Guru */}
        {activeTab === "collaboration" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-extrabold text-white mb-1">Hub Kolaborasi & Berbagi Perangkat</h2>
              <p className="text-xs text-slate-400">Guru dapat saling berbagi Modul Ajar, Bank Soal, dan LKPD dalam satu ekosistem sekolah.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Modul Ajar Shared</span>
                <h4 className="font-bold text-white mt-1">Fisika - Gelombang & Bunyi</h4>
                <p className="text-xs text-slate-400 mt-1">Dibuat oleh: Siti Rahma, M.Pd.</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">24 Guru Menggunakan</span>
                  <button className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white">Salin & Pakai</button>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Bank Soal Shared</span>
                <h4 className="font-bold text-white mt-1">Kuis Matematika Bangun Ruang</h4>
                <p className="text-xs text-slate-400 mt-1">Dibuat oleh: Budi Santoso, S.Pd.</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">40 Soal Pilihan Ganda</span>
                  <button className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white">Salin & Pakai</button>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl">
                <span className="text-[10px] font-bold text-pink-400 uppercase tracking-widest">LKPD Shared</span>
                <h4 className="font-bold text-white mt-1">Praktikum Coding Python Dasar</h4>
                <p className="text-xs text-slate-400 mt-1">Dibuat oleh: Ahmad Fauzi, S.T.</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">Formatif & Proyek</span>
                  <button className="px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-xs font-bold text-white">Salin & Pakai</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: AI Analytics & Insights */}
        {activeTab === "analytics" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-extrabold text-white mb-1">🤖 AI Automated School Insights</h2>
              <p className="text-xs text-slate-400">Analisis kecerdasan buatan berbasis data riil aktivitas guru dan kelengkapan materi kelas.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 border border-emerald-900/50 p-6 rounded-2xl">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                  <span>💡 Insight Efisiensi Mengajar</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Penggunaan **Modulajarpro Copilot** telah memangkas waktu persiapan administrasi guru sebesar **87.5%**. Guru kini mengalokasikan **4x lebih banyak waktu** untuk pendampingan individu murid di kelas.
                </p>
              </div>

              <div className="bg-slate-950 border border-indigo-900/50 p-6 rounded-2xl">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-2">
                  <span>🎯 Rekomendasi Supervisi Kepala Sekolah</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Mata pelajaran **Informatika & Matematika** menunjukkan peningkatan keterlibatan murid terbesar saat menggunakan media pembelajaran **AI Game & Komik Edukasi**. Disarankan memperluas ke rumpun IPS.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
