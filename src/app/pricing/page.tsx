"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function PricingAndGrowthPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [copiedReferral, setCopiedReferral] = useState(false);

  const copyReferralLink = () => {
    navigator.clipboard.writeText("https://modulajarpro.vercel.app/register?ref=GURU_ALDIRB354");
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
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
            <span className="font-extrabold text-lg text-white">Monetisasi & Growth Hub</span>
            <span className="text-[10px] font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 -mt-1">
              by Aldirb354
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl w-full mx-auto p-6 flex-1 flex flex-col gap-12 py-10">
        {/* SECTION 1: Subscription Tier Plans */}
        <section className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-800/80 text-xs text-indigo-300 mb-4">
            <span>💎 Model Langganan Resmi Modulajarpro</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Pilih Paket Pilihan untuk <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">Guru, Sekolah, & Yayasan</span>
          </h1>
          <p className="max-w-2xl text-slate-400 text-sm sm:text-base mb-8">
            Tingkatkan efisiensi kerja guru hingga 90% dengan fitur AI tercanggih, kolaborasi tanpa batas, dan perlindungan keamanan enterprise.
          </p>

          {/* Billing Switcher */}
          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl mb-12">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                billingCycle === "monthly" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              Bulanan
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === "yearly" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Tahunan</span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] px-2 py-0.5 rounded-full">Hemat 20%</span>
            </button>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full text-left">
            {/* PLAN 1: FREE */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">FREE</span>
                <h3 className="text-xl font-bold text-white mt-1">Uji Coba Guru</h3>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-extrabold text-white">Rp 0</span>
                  <span className="text-xs text-slate-500"> / selamanya</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> 10 Kuota Generate / Bulan</li>
                  <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Modul Ajar & ATP Basic</li>
                  <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Print & Save Dashboard</li>
                  <li className="flex items-center gap-2 text-slate-500"><span className="text-slate-600">✕</span> Export DOCX / PPTX</li>
                  <li className="flex items-center gap-2 text-slate-500"><span className="text-slate-600">✕</span> Fitur Approval WhatsApp</li>
                </ul>
              </div>
              <button className="w-full mt-8 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-xs text-white transition-all">
                Paket Aktif Saat Ini
              </button>
            </div>

            {/* PLAN 2: PRO GURU */}
            <div className="bg-gradient-to-b from-indigo-950/60 to-slate-900 border-2 border-indigo-500 rounded-3xl p-6 flex flex-col justify-between relative shadow-xl shadow-indigo-500/10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[10px] font-extrabold tracking-wider px-3 py-1 rounded-full uppercase shadow">
                Paling Populer
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">PRO GURU</span>
                <h3 className="text-xl font-bold text-white mt-1">Guru Profesional</h3>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-extrabold text-white">
                    {billingCycle === "monthly" ? "Rp 49.000" : "Rp 39.000"}
                  </span>
                  <span className="text-xs text-slate-400"> / bulan</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-200">
                  <li className="flex items-center gap-2"><span className="text-indigo-400 font-bold">✓</span> <strong>Unlimited Generate AI</strong></li>
                  <li className="flex items-center gap-2"><span className="text-indigo-400 font-bold">✓</span> <strong>Export PDF, DOCX, PPTX</strong></li>
                  <li className="flex items-center gap-2"><span className="text-indigo-400 font-bold">✓</span> Akses Teacher Copilot AI</li>
                  <li className="flex items-center gap-2"><span className="text-indigo-400 font-bold">✓</span> WOW Media Game & Komik</li>
                  <li className="flex items-center gap-2"><span className="text-indigo-400 font-bold">✓</span> Penjualan Marketplace Template</li>
                </ul>
              </div>
              <button className="w-full mt-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-95 font-bold text-xs text-white transition-all shadow-md shadow-indigo-500/25">
                Upgrade ke Pro Guru
              </button>
            </div>

            {/* PLAN 3: SEKOLAH */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-purple-500/50 transition-all">
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">SEKOLAH</span>
                <h3 className="text-xl font-bold text-white mt-1">Lisensi Sekolah</h3>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-extrabold text-white">
                    {billingCycle === "monthly" ? "Rp 499.000" : "Rp 399.000"}
                  </span>
                  <span className="text-xs text-slate-500"> / sekolah / bln</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><span className="text-purple-400 font-bold">✓</span> Multi Guru (Hingga 50 Akun)</li>
                  <li className="flex items-center gap-2"><span className="text-purple-400 font-bold">✓</span> Hub Kolaborasi & Shared Template</li>
                  <li className="flex items-center gap-2"><span className="text-purple-400 font-bold">✓</span> Dashboard Analitik Kepsek</li>
                  <li className="flex items-center gap-2"><span className="text-purple-400 font-bold">✓</span> Standar Modul & LKPD Sekolah</li>
                  <li className="flex items-center gap-2"><span className="text-purple-400 font-bold">✓</span> Approval WA/Telegram Bot</li>
                </ul>
              </div>
              <button className="w-full mt-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 font-bold text-xs text-white transition-all">
                Daftarkan Sekolah
              </button>
            </div>

            {/* PLAN 4: YAYASAN */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-pink-500/50 transition-all">
              <div>
                <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">YAYASAN</span>
                <h3 className="text-xl font-bold text-white mt-1">White-Label Enterprise</h3>
                <div className="mt-4 mb-6">
                  <span className="text-2xl font-extrabold text-white">Custom / Enterprise</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-center gap-2"><span className="text-pink-400 font-bold">✓</span> <strong>Full White Label & Domain Custom</strong></li>
                  <li className="flex items-center gap-2"><span className="text-pink-400 font-bold">✓</span> Multi-Sekolah Cabang Yayasan</li>
                  <li className="flex items-center gap-2"><span className="text-pink-400 font-bold">✓</span> Custom Logo & Branding Yayasan</li>
                  <li className="flex items-center gap-2"><span className="text-pink-400 font-bold">✓</span> Dedicated Support & Training</li>
                  <li className="flex items-center gap-2"><span className="text-pink-400 font-bold">✓</span> SLA Keamanan Enterprise 99.9%</li>
                </ul>
              </div>
              <button className="w-full mt-8 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-xs text-white border border-slate-700 transition-all">
                Hubungi Sales Enterprise
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 2: Fitur Viral Loop & Referral Program */}
        <section className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-slate-800 rounded-3xl p-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">🚀 Fitur Pertumbuhan Viral Loop</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-3">
              Ajak Rekan Guru & Dapatkan Akses Pro Gratis!
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Bagikan tautan referral unik Anda kepada rekan guru di sekolah Anda. Setiap 3 guru yang mendaftar, Anda mendapatkan <strong>1 Bulan Langganan PRO GURU Gratis</strong> secara otomatis!
            </p>

            <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 p-2.5 rounded-2xl max-w-md">
              <span className="text-xs text-slate-400 truncate flex-1 px-2 font-mono">
                https://modulajarpro.vercel.app/register?ref=GURU_ALDIRB354
              </span>
              <button
                onClick={copyReferralLink}
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all shrink-0"
              >
                {copiedReferral ? "Tersalin! ✓" : "Salin Link"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl text-center">
              <div className="text-2xl font-black text-indigo-400">12</div>
              <span className="text-[11px] text-slate-400">Guru Mendaftar</span>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl text-center">
              <div className="text-2xl font-black text-emerald-400">4 Bulan</div>
              <span className="text-[11px] text-slate-400">Bonus PRO Gratis</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
