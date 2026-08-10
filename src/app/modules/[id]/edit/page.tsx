import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import EditModuleForm from './edit-module-form'

type EditModulePageProps = {
  params: Promise<{ id: string }>
}

export default async function EditModulePage({
  params,
}: EditModulePageProps) {
  const { id } = await params

  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/login')
  }

  const { data: module, error } = await supabase
    .from('modules')
    .select(
      'id, title, subject, grade, phase, semester, learning_objectives, materials, introduction, core_activities, closing, assessment'
    )
    .eq('id', id)
    .single()

  if (error || !module) {
    notFound()
  }

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
              Edit Modul Ajar
            </h2>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Perbarui informasi dan materi Modul Ajar Anda.
            </p>
          </div>

          <EditModuleForm module={module} />
        </div>
      </div>
    </main>
  )
}