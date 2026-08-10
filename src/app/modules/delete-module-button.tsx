'use client'

import React, { useTransition } from 'react'
import { deleteModuleAction } from '@/app/actions/modules'

interface DeleteModuleButtonProps {
  moduleId: string
}

export default function DeleteModuleButton({ moduleId }: DeleteModuleButtonProps) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus modul ini?')) {
      startTransition(async () => {
        const res = await deleteModuleAction(moduleId)
        if (res?.error) {
          alert(res.error)
        }
      })
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="inline-flex flex-1 items-center justify-center rounded-lg border border-red-600 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50 dark:border-red-500 dark:text-red-400 dark:hover:bg-red-950/30"
    >
      {isPending ? 'Mengahapus...' : 'Hapus Modul'}
    </button>
  )
}
