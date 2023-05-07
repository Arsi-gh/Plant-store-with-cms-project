import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://ejndpupweadvbklmxttl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqbmRwdXB3ZWFkdmJrbG14dHRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc4Mzc0MDIsImV4cCI6MTk5MzQxMzQwMn0.zjdbaENTNw97S7CM8FXO8vjbXV-Mt-2Zx8FbUJVEQAw')

export {supabase}
