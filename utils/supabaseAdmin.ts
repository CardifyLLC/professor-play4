import { createClient } from '@supabase/supabase-js'

let supabaseAdmin: ReturnType<typeof createClient> | null = null

export function getSupabaseAdmin() {
  if (supabaseAdmin) {
    return supabaseAdmin
  }

  const url = process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_KEY

  if (!url || !serviceKey || url.includes('your-project')) {
    return null
  }

  supabaseAdmin = createClient(url, serviceKey)
  return supabaseAdmin
}
