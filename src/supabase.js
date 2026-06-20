import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hgbnzxzafssabfyijfva.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnYm56eHphZnNzYWJmeWlqZnZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5MjQxNTksImV4cCI6MjA5NzUwMDE1OX0.4I9xlTBl1YPP5HBJ3GBe2CD6xYjrntZqsn4kUUrA_CM'

export const supabase = createClient(supabaseUrl, supabaseKey)