// lib/supabaseClient.ts
import { createClient, type SupabaseClient, type Session, type User as SupabaseUser } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Export the type directly
export type { SupabaseUser as User, Session };
