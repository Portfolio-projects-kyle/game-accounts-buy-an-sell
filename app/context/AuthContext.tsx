"use client";
import { createContext, useContext, useEffect, useState } from "react";
// Change: Import createBrowserClient from @supabase/ssr
import { createBrowserClient } from "@supabase/ssr";
import { User } from "@supabase/supabase-js";

// Change: Initialize the SSR-compatible browser client
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This syncs the session with cookies automatically
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      
      // Security Tip: If a user signs out, refresh the page to clear all 
      // server-side caches and redirect via Middleware
      if (event === 'SIGNED_OUT') {
        window.location.href = '/login';
      }
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);