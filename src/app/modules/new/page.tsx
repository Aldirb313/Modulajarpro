'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { createModuleAction, type ModuleState } from '@/app/actions/modules'

const initialState: ModuleState = {}

export default function NewModulePage() {
  const [state, formAction, pending] = useActionState(
    createModuleAction,
    initialState
  )

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
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

        <Link
          href="/dashboard"
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center gap-2"
        >
          <span>← Kembali ke Dashboard</span>
        </Link>
      </header>

      {/* Main Container */}
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 flex-1">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Top Decorative Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Title */}
          <div className="mb-8 border-b border-slate-800/80 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800/80 text-[11px] text-indigo-300 mb-3">
              <span>⚡ Form Generator AI Perangkat Pembelajaran</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Buat Modul Ajar <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">Kurikulum Merdeka</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
              Isi informasi dasar materi pembelajaran di bawah ini. AI Engine akan memproses dan menyusun Modul Ajar secara otomatis.
            </p>
          </div>

          {state.error && (
            <div className="mb-6 rounded-2xl border border-rose-900/60 bg-rose-950/40 p-4 text-xs font-semibold text-rose-300">
              ⚠️ {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-8">
            {/* Section 1: Informasi Dasar */}
            <section className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-6">
              <h3 className="text-base font-bold text-indigo-400 mb-4 flex items-center gap-2">
                <span>📌 Informasi Dasar & Identitas</span>
              </h3>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="title"
                    className="block text-xs font-semibold text-slate-300 mb-2"
                  >
                    Judul Modul Ajar <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    placeholder="Contoh: Modul Ajar Biologi - Sistem Pernapasan Manusia"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-semibold text-slate-300 mb-2"
                  >
                    Mata Pelajaran <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="Contoh: IPA / Biologi"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="grade"
                    className="block text-xs font-semibold text-slate-300 mb-2"
                  >
                    Kelas <span className="text-rose-400">*</span>
                  </label>
                  <select
                    id="grade"
                    name="grade"
                    required
                    defaultValue=""
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  >
                    <option value="" disabled>
                      Pilih Tingkat Kelas
                    </option>
                    <option value="1">Kelas 1 SD</option>
                    <option value="2">Kelas 2 SD</option>
                    <option value="3">Kelas 3 SD</option>
                    <option value="4">Kelas 4 SD</option>
                    <option value="5">Kelas 5 SD</option>
                    <option value="6">Kelas 6 SD</option>
                    <option value="7">Kelas 7 SMP</option>
                    <option value="8">Kelas 8 SMP</option>
                    <option value="9">Kelas 9 SMP</option>
                    <option value="10">Kelas 10 SMA/SMK</option>
                    <option value="11">Kelas 11 SMA/SMK</option>
                    <option value="12">Kelas 12 SMA/SMK</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="phase"
                    className="block text-xs font-semibold text-slate-300 mb-2"
                  >
                    Fase Kurikulum <span className="text-rose-400">*</span>
                  </label>
                  <select
                    id="phase"
                    name="phase"
                    required
                    defaultValue=""
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  >
                    <option value="" disabled>
                      Pilih Fase
                    </option>
                    <option value="A">Fase A (Kelas 1-2 SD)</option>
                    <option value="B">Fase B (Kelas 3-4 SD)</option>
                    <option value="C">Fase C (Kelas 5-6 SD)</option>
                    <option value="D">Fase D (Kelas 7-9 SMP)</option>
                    <option value="E">Fase E (Kelas 10 SMA)</option>
                    <option value="F">Fase F (Kelas 11-12 SMA)</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="semester"
                    className="block text-xs font-semibold text-slate-300 mb-2"
                  >
                    Semester <span className="text-rose-400">*</span>
                  </label>
                  <select
                    id="semester"
                    name="semester"
                    required
                    defaultValue=""
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  >
                    <option value="" disabled>
                      Pilih Semester
                    </option>
                    <option value="1">Semester 1 (Ganjil)</option>
                    <option value="2">Semester 2 (Genap)</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Section 2: Isi Pembelajaran */}
            <section className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-6">
              <h3 className="text-base font-bold text-purple-400 mb-4 flex items-center gap-2">
                <span>📑 Isi Materi & Aktivitas Pembelajaran</span>
              </h3>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="learningObjectives"
                    className="block text-xs font-semibold text-slate-300 mb-2"
                  >
                    Tujuan Pembelajaran (TP)
                  </label>
                  <textarea
                    id="learningObjectives"
                    name="learningObjectives"
                    rows={3}
                    placeholder="Tuliskan tujuan pembelajaran yang ingin dicapai..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-white placeholder-slate-500 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="materials"
                    className="block text-xs font-semibold text-slate-300 mb-2"
                  >
                    Materi / Uraian Bahan Ajar
                  </label>
                  <textarea
                    id="materials"
                    name="materials"
                    rows={3}
                    placeholder="Ringkasan materi atau poin-poin utama bab..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-white placeholder-slate-500 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="introduction"
                    className="block text-xs font-semibold text-slate-300 mb-2"
                  >
                    Kegiatan Pendahuluan (Apersepsi & Warm-up)
                  </label>
                  <textarea
                    id="introduction"
                    name="introduction"
                    rows={3}
                    placeholder="Aktivitas awal, pertanyaan pemantik, & ice breaking..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-white placeholder-slate-500 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="coreActivities"
                    className="block text-xs font-semibold text-slate-300 mb-2"
                  >
                    Kegiatan Inti (Differentiated Learning / PjBL)
                  </label>
                  <textarea
                    id="coreActivities"
                    name="coreActivities"
                    rows={4}
                    placeholder="Langkah-langkah kegiatan praktikum, diskusi kelompok, atau proyek..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-white placeholder-slate-500 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="closing"
                    className="block text-xs font-semibold text-slate-300 mb-2"
                  >
                    Kegiatan Penutup & Refleksi
                  </label>
                  <textarea
                    id="closing"
                    name="closing"
                    rows={3}
                    placeholder="Kesimpulan materi, refleksi murid, dan apresiasi kelas..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-white placeholder-slate-500 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="assessment"
                    className="block text-xs font-semibold text-slate-300 mb-2"
                  >
                    Bentuk Asesmen (Formatif & Sumatif)
                  </label>
                  <textarea
                    id="assessment"
                    name="assessment"
                    rows={3}
                    placeholder="Bentuk kuis, lembar kerja LKPD, rubrik penilaian..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-white placeholder-slate-500 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>
              </div>
            </section>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-4 border-t border-slate-800/80 pt-6">
              <Link
                href="/dashboard"
                className="px-6 py-3.5 rounded-xl border border-slate-800 bg-slate-950 font-bold text-xs text-slate-400 hover:text-white hover:bg-slate-900 transition-all"
              >
                Batal
              </Link>

              <button
                type="submit"
                disabled={pending}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-95 font-extrabold text-xs text-white shadow-xl shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95 disabled:opacity-60"
              >
                {pending ? 'Menyusun Modul Ajar AI...' : '✨ Generate & Simpan Modul Ajar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}