import React from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { logoutAction } from '@/app/actions/auth'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      <nav className="bg-white dark:bg-neutral-800 border-b border-gray-200 dark:border-neutral-700 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Modul Ajar Pro
            </h1>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              Logout
            </button>
          </form>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-neutral-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Selamat Datang di Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
            Anda telah berhasil masuk sebagai:
          </p>

          <div className="inline-block bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 rounded-lg px-4 py-3">
            <span className="text-sm font-semibold text-blue-900 dark:text-blue-200">
              {user.email}
            </span>
          </div>
        </div>
      </main>
    </div>
  )
}
