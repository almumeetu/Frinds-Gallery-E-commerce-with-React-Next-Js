import { createClient } from '@supabase/supabase-js';

// Extend ImportMeta to include 'env' property for Vite
interface ImportMetaEnv {
	VITE_SUPABASE_URL: string;
	VITE_SUPABASE_ANON_KEY: string;
}

// Extend the global ImportMeta interface
declare global {
	interface ImportMeta {
		env: ImportMetaEnv;
	}
}

// Use environment variables in production, fallback to hardcoded for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gkvzcmhtsbhvydtdapxu.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrdnpjbWh0c2JodnlkdGRhcHh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzMTY1MTAsImV4cCI6MjA3OTg5MjUxMH0.Vs2m-HYZB87xqAQqB42pEbDLy-VljfukOFq73jfoDBQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
