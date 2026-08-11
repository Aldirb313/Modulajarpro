'use client'

import React, { useActionState } from 'react'
import Link from 'next/link'
import { registerAction } from '@/app/actions/auth'

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, null)

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-4 sm:px-6 lg:px-8 font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[250px] h-[250px] bg-pink-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full space-y-8 bg-slate-900/80 border border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-xl z-10 relative">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-black text-2xl text-white shadow-lg shadow-indigo-500/25 mx-auto mb-4">
            M
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
            Modulajarpro
          </h2>
          <p className="text-xs font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 -mt-0.5">
            by Aldirb354
          </p>
          <p className="mt-3 text-xs text-slate-400">
            Daftar Akun Baru & Dapatkan 10 Kuota AI Gratis
          </p>
        </div>

        {state?.error && (
          <div
            className="p-4 text-xs font-semibold text-rose-300 bg-rose-950/40 rounded-2xl border border-rose-900/60"
            role="alert"
          >
            ⚠️ {state.error}
          </div>
        )}

        {state?.success && (
          <div
            className="p-4 text-xs font-semibold text-emerald-300 bg-emerald-950/40 rounded-2xl border border-emerald-900/60"
            role="status"
          >
            ✓ {state.message}
          </div>
        )}

        <form action={formAction} className="mt-8 space-y-5">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-300 mb-2"
              >
                Alamat Email Sekolah / Personal
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={isPending}
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-slate-800 placeholder-slate-500 text-white bg-slate-950 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-xs disabled:opacity-50 transition-all"
                placeholder="nama@sekolah.sch.id"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-slate-300 mb-2"
              >
                Password Baru
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                disabled={isPending}
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-slate-800 placeholder-slate-500 text-white bg-slate-950 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-xs disabled:opacity-50 transition-all"
                placeholder="Minimal 6 karakter"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-semibold text-slate-300 mb-2"
              >
                Konfirmasi Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                disabled={isPending}
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-slate-800 placeholder-slate-500 text-white bg-slate-950 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-xs disabled:opacity-50 transition-all"
                placeholder="Ulangi password di atas"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center py-3.5 px-4 border border-transparent text-xs font-extrabold rounded-xl text-white bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:opacity-95 focus:outline-none shadow-xl shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {isPending ? 'Memproses Pendaftaran...' : 'Daftar Akun Guru Sekarang →'}
            </button>
          </div>
        </form>

        <div className="text-center mt-6 pt-4 border-t border-slate-800/80">
          <p className="text-xs text-slate-400">
            Sudah memiliki akun?{' '}
            <Link
              href="/login"
              className="font-bold text-purple-400 hover:text-purple-300 transition-colors"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
