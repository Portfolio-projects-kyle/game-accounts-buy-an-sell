"use client";

import { useState, FormEvent, useMemo } from "react";
import { Container, Box, TextField, Button, Typography, Link, Alert, CircularProgress } from "@mui/material";
import NextLink from "next/link";
import { createBrowserClient } from "@supabase/ssr";

interface SignUpState {
  name: string;
  email: string;
  password: string;
}

export default function SignUpPage() {
  const [form, setForm] = useState<SignUpState>({ name: "", email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize Supabase client
  const supabase = useMemo(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);

    // This determines the base URL dynamically
    const origin = typeof window !== 'undefined' ? window.location.origin : '';

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { 
        data: { name: form.name },
        // This ensures the "Confirm Email" link in the inbox points to your 
        // actual deployed site (e.g., Vercel) instead of localhost.
        emailRedirectTo: `${origin}/auth/callback`, 
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setIsSubmitting(false);
    } else {
      setSuccessMsg("Success! Please check your email inbox to confirm your account.");
      // Keep isSubmitting true to prevent double sign-ups after success
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        mt: 12, 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        p: 4, 
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)", 
        borderRadius: 3,
        bgcolor: "#111827", // Matching your dark theme
        color: "white"
      }}>
        <Typography variant="h4" mb={1} fontWeight="bold">Create Account</Typography>
        <Typography variant="body2" color="gray" mb={3}>Join the marketplace today</Typography>

        {successMsg ? (
          <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
            {successMsg}
          </Alert>
        ) : (
          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <TextField 
              name="name" 
              margin="normal" 
              fullWidth 
              label="Full Name" 
              value={form.name} 
              onChange={handleChange} 
              required 
              variant="filled"
              sx={{ bgcolor: "#1f2937", borderRadius: 1, input: { color: "white" } }}
              InputLabelProps={{ style: { color: "#9ca3af" } }}
            />
            <TextField 
              name="email" 
              margin="normal" 
              fullWidth 
              label="Email Address" 
              type="email" 
              value={form.email} 
              onChange={handleChange} 
              required 
              variant="filled"
              sx={{ bgcolor: "#1f2937", borderRadius: 1, input: { color: "white" } }}
              InputLabelProps={{ style: { color: "#9ca3af" } }}
            />
            <TextField 
              name="password" 
              margin="normal" 
              fullWidth 
              label="Password" 
              type="password" 
              value={form.password} 
              onChange={handleChange} 
              required 
              variant="filled"
              sx={{ bgcolor: "#1f2937", borderRadius: 1, input: { color: "white" } }}
              InputLabelProps={{ style: { color: "#9ca3af" } }}
            />

            {errorMsg && <Alert severity="error" sx={{ mt: 2 }}>{errorMsg}</Alert>}

            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              disabled={isSubmitting}
              sx={{ 
                mt: 4, 
                mb: 2, 
                py: 1.5, 
                bgcolor: "#6366f1", 
                fontWeight: "bold",
                "&:hover": { bgcolor: "#4f46e5" } 
              }}
            >
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
            </Button>
            
            <Typography variant="body2" textAlign="center" sx={{ mt: 1, color: "#9ca3af" }}>
              Already have an account?{" "}
              <Link component={NextLink} href="/login" sx={{ color: "#818cf8", textDecoration: "none", fontWeight: "bold" }}>
                Login
              </Link>
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}