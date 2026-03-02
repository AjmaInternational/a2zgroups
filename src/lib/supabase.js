import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ryefgiezbwfbbfrgibgh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5ZWZnaWV6YndmYmJmcmdpYmdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyNTUwNTQsImV4cCI6MjA4NzgzMTA1NH0.lKhZw7Cm68OOTYWRrUjGe6cDHFAoBl5awFd881VOO5Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
