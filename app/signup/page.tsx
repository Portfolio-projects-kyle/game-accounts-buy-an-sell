"use client";

import { useState, FormEvent } from "react";
import { Container, Box, TextField, Button, Typography, Link } from "@mui/material";
import NextLink from "next/link";
// 1. Switch to SSR client
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

  // 2. Initialize correct client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { 
        data: { name: form.name },
        // 3. Crucial: Tell Supabase where to go after email confirmation
        emailRedirectTo: `${window.location.origin}/auth/callback`, 
      },
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg("Sign up successful! Please check your email to confirm your account.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 12, display: "flex", flexDirection: "column", alignItems: "center", p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" mb={3}>Sign Up</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField name="name" margin="normal" fullWidth label="Name" value={form.name} onChange={handleChange} required />
          <TextField name="email" margin="normal" fullWidth label="Email" type="email" value={form.email} onChange={handleChange} required />
          <TextField name="password" margin="normal" fullWidth label="Password" type="password" value={form.password} onChange={handleChange} required />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
          
          {errorMsg && <Typography color="error" sx={{ mt: 1 }}>{errorMsg}</Typography>}
          {successMsg && <Typography color="success.main" sx={{ mt: 1, fontWeight: 'bold' }}>{successMsg}</Typography>}
          
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account? <Link component={NextLink} href="/login">Login</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}