'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type AuthState = {
  error?: string
  success?: boolean
  message?: string
}

export async function loginAction(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !email.trim()) {
    return { error: 'Email is required.' }
  }

  // Basic email pattern validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.trim())) {
    return { error: 'Please enter a valid email address.' }
  }

  if (!password) {
    return { error: 'Password is required.' }
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (error) {
      // Map Supabase error to a safe user message
      if (error.message.includes('Invalid login credentials')) {
        return { error: 'Invalid email or password.' }
      }
      return { error: error.message || 'Failed to sign in. Please try again.' }
    }
  } catch (err) {
    if (err && typeof err === 'object' && 'digest' in err) {
      throw err
    }
    return { error: 'An unexpected error occurred. Please try again.' }
  }

  redirect('/dashboard')
}

export async function logoutAction(): Promise<void> {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
  } catch (err) {
    if (err && typeof err === 'object' && 'digest' in err) {
      throw err
    }
    // Handle failures gracefully without exposing server details
  }

  redirect('/login')
}



export async function registerAction(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!email || !email.trim()) {
    return { error: 'Email is required.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.trim())) {
    return { error: 'Please enter a valid email address.' }
  }

  if (!password) {
    return { error: 'Password is required.' }
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters long.' }
  }

  if (!confirmPassword) {
    return { error: 'Please confirm your password.' }
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' }
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    })

    if (error) {
      return { error: error.message || 'Failed to register account. Please try again.' }
    }

    return {
      success: true,
      message: 'Registration successful! Please check your email for confirmation.',
    }
  } catch {
    return { error: 'An unexpected error occurred. Please try again.' }
  }
}
