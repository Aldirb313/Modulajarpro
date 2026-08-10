'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type ModuleState = {
  error?: string
  success?: boolean
  message?: string
}

export async function createModuleAction(
  prevState: ModuleState | null,
  formData: FormData
): Promise<ModuleState> {
  const title = formData.get('title') as string
  const subject = formData.get('subject') as string
  const grade = formData.get('grade') as string
  const phase = formData.get('phase') as string
  const semester = formData.get('semester') as string
  const learningObjectives = formData.get('learningObjectives') as string
  const materials = formData.get('materials') as string
  const introduction = formData.get('introduction') as string
  const coreActivities = formData.get('coreActivities') as string
  const closing = formData.get('closing') as string
  const assessment = formData.get('assessment') as string

  if (!title?.trim()) {
    return { error: 'Judul modul wajib diisi.' }
  }

  if (!subject?.trim()) {
    return { error: 'Mata pelajaran wajib diisi.' }
  }

  if (!grade?.trim()) {
    return { error: 'Kelas wajib diisi.' }
  }

  if (!phase?.trim()) {
    return { error: 'Fase wajib diisi.' }
  }

  if (!semester?.trim()) {
    return { error: 'Semester wajib diisi.' }
  }

  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return { error: 'Anda harus login terlebih dahulu.' }
    }

    const { error } = await supabase.from('modules').insert({
      user_id: user.id,
      title: title.trim(),
      subject: subject.trim(),
      grade: grade.trim(),
      phase: phase.trim(),
      semester: semester.trim(),
      learning_objectives: learningObjectives?.trim() || null,
      materials: materials?.trim() || null,
      introduction: introduction?.trim() || null,
      core_activities: coreActivities?.trim() || null,
      closing: closing?.trim() || null,
      assessment: assessment?.trim() || null,
    })

    if (error) {
      return {
        error: error.message || 'Gagal menyimpan Modul Ajar.',
      }
    }
  } catch (err) {
    if (err && typeof err === 'object' && 'digest' in err) {
      throw err
    }

    return {
      error: 'Terjadi kesalahan. Silakan coba lagi.',
    }
  }

  redirect('/dashboard')
}