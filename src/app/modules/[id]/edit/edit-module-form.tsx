'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import {
  updateModuleAction,
  type ModuleState,
} from '@/app/actions/modules'

type Module = {
  id: string
  title: string
  subject: string
  grade: string | null
  phase: string | null
  semester: string | null
  learning_objectives: string | null
  materials: string | null
  introduction: string | null
  core_activities: string | null
  closing: string | null
  assessment: string | null
}

type EditModuleFormProps = {
  module: Module
}

export default function EditModuleForm({
  module,
}: EditModuleFormProps) {
  const updateAction = updateModuleAction.bind(null, module.id)

  const [state, formAction, pending] = useActionState<ModuleState, FormData>(
    updateAction,
    {}
  )

  return (
    <form action={formAction} className="space-y-8">
      {state.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}

      {state.success && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {state.message}
        </div>
      )}

      <section>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Informasi Dasar
        </h3>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Judul Modul
            </label>

            <input
              id="title"
              name="title"
              type="text"
              required
              defaultValue={module.title}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Mata Pelajaran
            </label>

            <input
              id="subject"
              name="subject"
              type="text"
              required
              defaultValue={module.subject}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="grade"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Kelas
            </label>

            <select
              id="grade"
              name="grade"
              required
              defaultValue={module.grade ?? ''}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            >
              <option value="" disabled>
                Pilih kelas
              </option>
              {Array.from({ length: 12 }, (_, index) => {
                const value = String(index + 1)

                return (
                  <option key={value} value={value}>
                    Kelas {value}
                  </option>
                )
              })}
            </select>
          </div>

          <div>
            <label
              htmlFor="phase"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Fase
            </label>

            <select
              id="phase"
              name="phase"
              required
              defaultValue={module.phase ?? ''}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            >
              <option value="" disabled>
                Pilih fase
              </option>
              {['A', 'B', 'C', 'D', 'E', 'F'].map((value) => (
                <option key={value} value={value}>
                  Fase {value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="semester"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Semester
            </label>

            <select
              id="semester"
              name="semester"
              required
              defaultValue={module.semester ?? ''}
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
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Isi Pembelajaran
        </h3>

        <div className="space-y-5">
          <div>
            <label
              htmlFor="learningObjectives"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Tujuan Pembelajaran
            </label>

            <textarea
              id="learningObjectives"
              name="learningObjectives"
              rows={4}
              defaultValue={module.learning_objectives ?? ''}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="materials"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Materi Pembelajaran
            </label>

            <textarea
              id="materials"
              name="materials"
              rows={4}
              defaultValue={module.materials ?? ''}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="introduction"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Kegiatan Pendahuluan
            </label>

            <textarea
              id="introduction"
              name="introduction"
              rows={4}
              defaultValue={module.introduction ?? ''}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="coreActivities"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Kegiatan Inti
            </label>

            <textarea
              id="coreActivities"
              name="coreActivities"
              rows={5}
              defaultValue={module.core_activities ?? ''}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="closing"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Kegiatan Penutup
            </label>

            <textarea
              id="closing"
              name="closing"
              rows={4}
              defaultValue={module.closing ?? ''}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="assessment"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Asesmen
            </label>

            <textarea
              id="assessment"
              name="assessment"
              rows={4}
              defaultValue={module.assessment ?? ''}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            />
          </div>
        </div>
      </section>

      <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-6 dark:border-neutral-800">
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
          {pending ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>
    </form>
  )
}