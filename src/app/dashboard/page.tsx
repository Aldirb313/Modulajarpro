import React from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { logoutAction } from '@/app/actions/auth'
import DeleteModuleButton from '@/app/modules/delete-module-button'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  const { data: modules, error: modulesError } = await supabase
    .from('modules')
    .select(
      'id, title, subject, grade, phase, semester, created_at'
    )
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950">
      <header className="border-b bg-white dark:bg-neutral-900 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Modulajarpro
            </h1>
            <span className="text-[10px] font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 -mt-1">
              by Aldirb354
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/copilot"
              className="px-3 py-1.5 rounded-lg bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 font-bold text-xs hover:bg-indigo-600 hover:text-white transition-all"
            >
              🧠 Copilot
            </Link>
            <Link
              href="/school"
              className="px-3 py-1.5 rounded-lg bg-purple-600/10 border border-purple-500/30 text-purple-400 font-bold text-xs hover:bg-purple-600 hover:text-white transition-all"
            >
              🏫 School OS
            </Link>
            <Link
              href="/pricing"
              className="px-3 py-1.5 rounded-lg bg-emerald-600/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs hover:bg-emerald-600 hover:text-white transition-all"
            >
              💎 Paket Subscription
            </Link>
            <Link
              href="/marketplace"
              className="px-3 py-1.5 rounded-lg bg-pink-600/10 border border-pink-500/30 text-pink-400 font-bold text-xs hover:bg-pink-600 hover:text-white transition-all"
            >
              🏪 Marketplace & XP
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-lg bg-gray-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Selamat Datang di Dashboard
            </h2>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Anda telah berhasil masuk sebagai:
            </p>

            <div className="mt-3 inline-block rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-800 dark:bg-blue-950/50">
              <span className="text-sm font-semibold text-blue-900 dark:text-blue-200">
                {user.email}
              </span>
            </div>
          </div>

          <Link
            href="/modules/new"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            + Buat Modul Ajar
          </Link>
        </div>

        <section>
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Modul Saya
            </h3>

            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Daftar Modul Ajar yang telah Anda buat.
            </p>
          </div>

          {modulesError ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
              Gagal memuat Modul Ajar.
            </div>
          ) : modules && modules.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {modules.map((module) => (
                <article
                  key={module.id}
                  className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    {module.title}
                  </h4>

                  <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <p>
                      <span className="font-semibold">Mata Pelajaran:</span>{' '}
                      {module.subject}
                    </p>

                    <p>
                      <span className="font-semibold">Kelas:</span>{' '}
                      {module.grade}
                    </p>

                    <p>
                      <span className="font-semibold">Fase:</span>{' '}
                      {module.phase}
                    </p>

                    <p>
                      <span className="font-semibold">Semester:</span>{' '}
                      {module.semester}
                    </p>

<div className="mt-5 flex gap-3 border-t border-gray-100 pt-4 dark:border-neutral-800">
  <Link
    href={`/modules/${module.id}/edit`}
    className="inline-flex flex-1 items-center justify-center rounded-lg border border-blue-600 px-4 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-950/30"
  >
    Edit Modul
  </Link>

  <DeleteModuleButton moduleId={module.id} />
</div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center dark:border-neutral-700 dark:bg-neutral-900">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Belum ada Modul Ajar
              </h4>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Buat Modul Ajar pertama Anda untuk mulai mengisi dashboard.
              </p>

              <Link
                href="/modules/new"
                className="mt-5 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Buat Modul Ajar
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}