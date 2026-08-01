import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-supabase-project-url')) {
  console.warn(
    '[Supabase] Faltan las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY. Por favor configúralas en tu archivo .env.local'
  )
}

export const supabase = createClient(
  supabaseUrl || 'https://dummy.supabase.co',
  supabaseAnonKey || 'dummy'
)
