import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logoutAction } from "@/app/actions/auth";
import DeleteModuleButton from "@/app/modules/delete-module-button";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const { data: modules, error: modulesError } = await supabase
    .from("modules")
    .select("id, title, subject, grade, phase, semester, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-indigo-500/25">
            M
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Modulajarpro
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 -mt-1">
              by Aldirb354
            </span>
          </div>
        </div>

        {/* Futuristic Workspace Navigation Bar */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl shadow-inner">
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20"
          >
            📊 Workspace Dashboard
          </Link>
          <Link
            href="/copilot"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center gap-1.5"
          >
            <span>🧠</span>
            <span>Copilot AI</span>
          </Link>
          <Link
            href="/school"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center gap-1.5"
          >
            <span>🏫</span>
            <span>School OS</span>
          </Link>
          <Link
            href="/marketplace"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center gap-1.5"
          >
            <span>🏪</span>
            <span>Market & XP</span>
          </Link>
          <Link
            href="/pricing"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-400 hover:bg-emerald-950/40 border border-emerald-800/40 transition-all flex items-center gap-1.5"
          >
            <span>💎</span>
            <span>Pro Plan</span>
          </Link>
        </div>

        {/* User Account Controls */}
        <div className="flex items-center gap-4">
          <form action={logoutAction}>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 border border-transparent hover:border-rose-800/40 transition-all"
            >
              Keluar
            </button>
          </form>
        </div>
      </header>

      {/* Main Workspace Dashboard Content */}
      <main className="max-w-7xl w-full mx-auto px-6 lg:px-12 py-10 flex-1 flex flex-col gap-8">
        {/* Welcome Hero Banner */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-slate-800 rounded-3xl p-8 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-[11px] text-indigo-300 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sistem Pembelajaran AI Siap Digunakan</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Selamat Datang Kembali, <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">Guru Hebat!</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl leading-relaxed">
              Akun Terverifikasi: <span className="text-indigo-300 font-semibold">{user.email}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 z-10 w-full sm:w-auto">
            <Link
              href="/modules/new"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-95 text-white font-extrabold text-sm shadow-xl shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>+ Buat Modul Ajar AI</span>
            </Link>
          </div>
        </div>

        {/* Quick Analytics Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
            <span className="text-xs text-slate-400 font-medium">Total Modul Dibuat</span>
            <div className="text-3xl font-extrabold text-white mt-1">{modules ? modules.length : 0} Dokumen</div>
            <span className="text-[10px] text-indigo-400 font-semibold mt-2 inline-block">✓ Terimpan Aman di Supabase</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
            <span className="text-xs text-slate-400 font-medium">Status Kuota AI</span>
            <div className="text-3xl font-extrabold text-emerald-400 mt-1">UNLIMITED</div>
            <span className="text-[10px] text-emerald-300 font-semibold mt-2 inline-block">Pro Guru Access</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
            <span className="text-xs text-slate-400 font-medium">Level XP Mengajar</span>
            <div className="text-3xl font-extrabold text-purple-400 mt-1">1,450 XP</div>
            <span className="text-[10px] text-purple-300 font-semibold mt-2 inline-block">Level 8 (Master Innovator)</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
            <span className="text-xs text-slate-400 font-medium">Waktu Terhemat AI</span>
            <div className="text-3xl font-extrabold text-pink-400 mt-1">~42 Jam</div>
            <span className="text-[10px] text-slate-400 font-semibold mt-2 inline-block">Otomatisasi Dokumen</span>
          </div>
        </div>

        {/* My Document Repository Section */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white">Repository Modul Saya</h3>
              <p className="text-xs text-slate-400 mt-0.5">Kelola dan edit seluruh Perangkat Pembelajaran yang telah di-generate AI.</p>
            </div>
            <Link
              href="/modules/new"
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              + Generasi Baru →
            </Link>
          </div>

          {modulesError ? (
            <div className="rounded-2xl border border-rose-900/50 bg-rose-950/30 p-6 text-sm text-rose-300">
              Gagal memuat daftar Modul Ajar. Silakan muat ulang halaman.
            </div>
          ) : modules && modules.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {modules.map((module) => (
                <article
                  key={module.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm hover:border-indigo-500/50 transition-all flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold text-indigo-400 bg-indigo-950 px-2.5 py-0.5 rounded-md border border-indigo-800/60">
                        {module.phase || "Fase E"} - {module.grade || "Kelas 10"}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {new Date(module.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                      {module.title}
                    </h4>

                    <div className="mt-4 space-y-1.5 text-xs text-slate-400">
                      <p><span className="text-slate-500">Mata Pelajaran:</span> <strong className="text-slate-200">{module.subject}</strong></p>
                      <p><span className="text-slate-500">Semester:</span> <strong className="text-slate-200">{module.semester || "Ganjil"}</strong></p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-3 border-t border-slate-800/80 pt-4">
                    <Link
                      href={`/modules/${module.id}/edit`}
                      className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-indigo-600 font-bold text-xs text-white text-center transition-all border border-slate-700 hover:border-indigo-500"
                    >
                      Buka Editor
                    </Link>

                    <DeleteModuleButton moduleId={module.id} />
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-900/40 p-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-2xl font-bold mb-4">
                📝
              </div>
              <h4 className="text-lg font-bold text-white">Belum Ada Modul Ajar</h4>
              <p className="mt-1 text-xs text-slate-400 max-w-sm leading-relaxed">
                Anda belum membuat perangkat pembelajaran. Klik tombol di bawah untuk membuat Modul Ajar pertama Anda secara instan dengan AI!
              </p>
              <Link
                href="/modules/new"
                className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-bold text-xs text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-105"
              >
                + Buat Modul Ajar Pertama AI
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}