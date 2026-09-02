import { createClient } from '@supabase/supabase-js'

/* Supabase is wired but optional. With no env vars the app runs fully on
 * device storage, which is what makes it demoable to the hospital today and
 * testable without an account. Set both vars and sync turns on. */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured
  ? createClient(url!, anonKey!, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null
