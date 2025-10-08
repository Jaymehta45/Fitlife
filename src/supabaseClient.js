import { createClient } from '@supabase/supabase-js'

// ⬇️ Replace these with your real values from the Supabase dashboard
const SUPABASE_URL = 'https://oqxrtbmtxztsnwobsuog.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xeHJ0Ym10eHp0c253b2JzdW9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MTI1ODksImV4cCI6MjA3NTQ4ODU4OX0.k_lxxG6dm_iXVhg7rbJW4pqqdk7d3NtYffYgtchOhlo'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)