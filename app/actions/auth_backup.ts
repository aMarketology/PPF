'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signUp(formData: {
  email: string
  password: string
  fullName: string
  userType: 'client' | 'engineer'
  companyName?: string
  jobTitle?: string
  professionalTitle?: string
  yearsOfExperience?: number
  specialties?: string[]
  hourlyRate?: number
  bio?: string
}) {
  const supabase = await createClient()

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        full_name: formData.fullName,
        user_type: formData.userType,
      },
    },
  })

  if (authError) {
    return { error: authError.message }
  }

  if (!authData.user) {
    return { error: 'Failed to create user' }
  }

  // Update profile with additional information
  const { error: profileError } = await supabase
    .from('profiles')
    .update({
      full_name: formData.fullName,
      user_type: formData.userType,
      company_name: formData.companyName,
      job_title: formData.jobTitle,
      bio: formData.bio,
    })
    .eq('id', authData.user.id)

  if (profileError) {
    return { error: profileError.message }
  }

  // If user is an engineer, create engineer profile
  if (formData.userType === 'engineer') {
    const { error: engineerError } = await supabase
      .from('engineer_profiles')
      .insert({
        user_id: authData.user.id,
        professional_title: formData.professionalTitle,
        years_of_experience: formData.yearsOfExperience,
        specialties: formData.specialties,
        hourly_rate: formData.hourlyRate,
      })

    if (engineerError) {
      return { error: engineerError.message }
    }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function signIn(formData: { email: string; password: string }) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signOut() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function getUser() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  // Get profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // If engineer, get engineer profile
  let engineerProfile = null
  if (profile?.user_type === 'engineer') {
    const { data } = await supabase
      .from('engineer_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()
    engineerProfile = data
  }

  return {
    ...user,
    profile,
    engineerProfile,
  }
}

export async function updateProfile(formData: {
  fullName?: string
  avatarUrl?: string
  companyName?: string
  jobTitle?: string
  bio?: string
  location?: string
  phone?: string
  website?: string
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: formData.fullName,
      avatar_url: formData.avatarUrl,
      company_name: formData.companyName,
      job_title: formData.jobTitle,
      bio: formData.bio,
      location: formData.location,
      phone: formData.phone,
      website: formData.website,
    })
    .eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}

export async function updateEngineerProfile(formData: {
  professionalTitle?: string
  yearsOfExperience?: number
  hourlyRate?: number
  specialties?: string[]
  certifications?: string[]
  licenses?: string[]
  available?: boolean
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { error } = await supabase
    .from('engineer_profiles')
    .update({
      professional_title: formData.professionalTitle,
      years_of_experience: formData.yearsOfExperience,
      hourly_rate: formData.hourlyRate,
      specialties: formData.specialties,
      certifications: formData.certifications,
      licenses: formData.licenses,
      available: formData.available,
    })
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  return { success: true }
}
