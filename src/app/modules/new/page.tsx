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
    <main className="min-h-screen bg-gray-50 dark:bg-neutral-950">
      <header className="border-b bg-white dark:bg-neutral-900 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Modul Ajar Pro
          </h1>

          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Kembali ke Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-md border border-gray-100 dark:border-neutral-800 p-6 sm:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Buat Modul Ajar
            </h2>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Isi informasi dasar dan materi pembelajaran.
            </p>
          </div>

          {state.error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-8">
            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Informasi Dasar
              </h3>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                  >
                    Judul Modul
                  </label>

                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    placeholder="Contoh: Sistem Pernapasan Manusia"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                  >
                    Mata Pelajaran
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="Contoh: IPA"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="grade"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                  >
                    Kelas
                  </label>

                  <select
                    id="grade"
                    name="grade"
                    required
                    defaultValue=""
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  >
                    <option value="" disabled>
                      Pilih kelas
                    </option>
                    <option value="1">Kelas 1</option>
                    <option value="2">Kelas 2</option>
                    <option value="3">Kelas 3</option>
                    <option value="4">Kelas 4</option>
                    <option value="5">Kelas 5</option>
                    <option value="6">Kelas 6</option>
                    <option value="7">Kelas 7</option>
                    <option value="8">Kelas 8</option>
                    <option value="9">Kelas 9</option>
                    <option value="10">Kelas 10</option>
                    <option value="11">Kelas 11</option>
                    <option value="12">Kelas 12</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="phase"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                  >
                    Fase
                  </label>

                  <select
                    id="phase"
                    name="phase"
                    required
                    defaultValue=""
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  >
                    <option value="" disabled>
                      Pilih fase
                    </option>
                    <option value="A">Fase A</option>
                    <option value="B">Fase B</option>
                    <option value="C">Fase C</option>
                    <option value="D">Fase D</option>
                    <option value="E">Fase E</option>
                    <option value="F">Fase F</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="semester"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                  >
                    Semester
                  </label>

                  <select
                    id="semester"
                    name="semester"
                    required
                    defaultValue=""
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  >
                    <option value="" disabled>
                      Pilih semester
                    </option>
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                  </select>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Isi Pembelajaran
              </h3>

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="learningObjectives"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                  >
                    Tujuan Pembelajaran
                  </label>

                  <textarea
                    id="learningObjectives"
                    name="learningObjectives"
                    rows={4}
                    placeholder="Tuliskan tujuan pembelajaran..."
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="materials"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                  >
                    Materi Pembelajaran
                  </label>

                  <textarea
                    id="materials"
                    name="materials"
                    rows={4}
                    placeholder="Tuliskan materi pembelajaran..."
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="introduction"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                  >
                    Kegiatan Pendahuluan
                  </label>

                  <textarea
                    id="introduction"
                    name="introduction"
                    rows={4}
                    placeholder="Tuliskan kegiatan pendahuluan..."
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="coreActivities"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                  >
                    Kegiatan Inti
                  </label>

                  <textarea
                    id="coreActivities"
                    name="coreActivities"
                    rows={5}
                    placeholder="Tuliskan kegiatan inti..."
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="closing"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                  >
                    Kegiatan Penutup
                  </label>

                  <textarea
                    id="closing"
                    name="closing"
                    rows={4}
                    placeholder="Tuliskan kegiatan penutup..."
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="assessment"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                  >
                    Asesmen
                  </label>

                  <textarea
                    id="assessment"
                    name="assessment"
                    rows={4}
                    placeholder="Tuliskan bentuk asesmen..."
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                  />
                </div>
              </div>
            </section>

            <div className="flex items-center justify-end gap-3 border-t border-gray-100 dark:border-neutral-800 pt-6">
              <Link
                href="/dashboard"
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-800"
              >
                Batal
              </Link>

              <button
                type="submit"
                disabled={pending}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending ? 'Menyimpan...' : 'Simpan Modul Ajar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}