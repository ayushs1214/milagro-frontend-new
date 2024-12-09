import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bogholjmdmomadbarojo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvZ2hvbGptZG1vbWFkYmFyb2pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxNzQ4MTAsImV4cCI6MjA0Nzc1MDgxMH0.MPYau-h5Qz6QsclDvr3ZwHuKPUBdUwgse4FejtlYp7A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
