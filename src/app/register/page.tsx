'use client'

import React, { useActionState } from 'react'
import Link from 'next/link'
import { registerAction } from '@/app/actions/auth'

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, null)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-neutral-700">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Modul Ajar Pro
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Buat akun baru untuk memulai
          </p>
        </div>

        {state?.error && (
          <div
            className="p-4 text-sm text-red-800 bg-red-50 dark:bg-red-950/50 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800"
            role="alert"
          >
            {state.error}
          </div>
        )}

        {state?.success && (
          <div
            className="p-4 text-sm text-green-800 bg-green-50 dark:bg-green-950/50 dark:text-green-300 rounded-lg border border-green-200 dark:border-green-800"
            role="status"
          >
            {state.message}
          </div>
        )}

        <form action={formAction} className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={isPending}
                className="appearance-none rounded-lg relative block w-full px-3 py-2.5 border border-gray-300 dark:border-neutral-600 placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm disabled:opacity-50"
                placeholder="nama@sekolah.sch.id"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                disabled={isPending}
                className="appearance-none rounded-lg relative block w-full px-3 py-2.5 border border-gray-300 dark:border-neutral-600 placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm disabled:opacity-50"
                placeholder="Minimal 6 karakter"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
                className="appearance-none rounded-lg relative block w-full px-3 py-2.5 border border-gray-300 dark:border-neutral-600 placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm disabled:opacity-50"
                placeholder="Ulangi password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isPending ? 'Memproses...' : 'Daftar'}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sudah memiliki akun?{' '}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
