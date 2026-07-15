import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://vqexsjgrgsyvuylkljgs.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxZXhzamdyZ3N5dnV5bGtsamdzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDEwNjkwNSwiZXhwIjoyMDk5NjgyOTA1fQ.FolWAG0922eUT4W7ecoUD-BoQmy2HOJFEbAjRoswJ9U"

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
)