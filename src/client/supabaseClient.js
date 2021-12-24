import { createClient } from "@supabase/supabase-js";


const options = {
    schema: 'public',
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }

export const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY, options)