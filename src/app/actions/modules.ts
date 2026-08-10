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
export async function updateModuleAction(
  moduleId: string,
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

  if (!moduleId) {
    return { error: 'Module ID is required.' }
  }

  if (!title || !title.trim()) {
    return { error: 'Title is required.' }
  }

  if (!subject || !subject.trim()) {
    return { error: 'Subject is required.' }
  }

  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return { error: 'You must be logged in to update a module.' }
    }

    const { error } = await supabase
      .from('modules')
      .update({
        title: title.trim(),
        subject: subject.trim(),
        grade: grade?.trim() || null,
        phase: phase?.trim() || null,
        semester: semester?.trim() || null,
        learning_objectives: learningObjectives?.trim() || null,
        materials: materials?.trim() || null,
        introduction: introduction?.trim() || null,
        core_activities: coreActivities?.trim() || null,
        closing: closing?.trim() || null,
        assessment: assessment?.trim() || null,
      })
      .eq('id', moduleId)
      .eq('user_id', user.id)

    if (error) {
      return {
        error: error.message || 'Failed to update module.',
      }
    }

    return {
      success: true,
      message: 'Module updated successfully.',
    }
  } catch {
    return {
      error: 'An unexpected error occurred. Please try again.',
    }
  }
}

export async function deleteModuleAction(
  moduleId: string
): Promise<ModuleState> {
  if (!moduleId) {
    return { error: 'Module ID is required.' }
  }

  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return { error: 'You must be logged in to delete a module.' }
    }

    const { error } = await supabase
      .from('modules')
      .delete()
      .eq('id', moduleId)
      .eq('user_id', user.id)

    if (error) {
      return {
        error: error.message || 'Failed to delete module.',
      }
    }

    redirect('/dashboard')
  } catch (err) {
    if (err && typeof err === 'object' && 'digest' in err) {
      throw err
    }

    return {
      error: 'An unexpected error occurred. Please try again.',
    }
  }
}