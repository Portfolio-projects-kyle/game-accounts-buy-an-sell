"use client";

import { useState, FormEvent, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container, Box, TextField, Button, Typography, Link, Alert, CircularProgress } from "@mui/material";
import NextLink from "next/link";
import { createBrowserClient } from "@supabase/ssr";

interface LoginState {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [form, setForm] = useState<LoginState>({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Get the 'next' destination and the 'reason' from URL
  const nextRoute = searchParams.get("next") ?? "/dashboard";
  const reason = searchParams.get("reason");

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
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else if (data.user) {
      router.refresh(); 
      router.push(nextRoute);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          borderRadius: 3,
          bgcolor: "#111827",
          color: "white"
        }}
      >
        <Typography variant="h4" mb={1} fontWeight="bold">
          Welcome Back
        </Typography>

        {/* 2. Professional Notice for Sellers */}
        {reason === "sell" && (
          <Alert 
            severity="info" 
            variant="outlined"
            sx={{ 
              mb: 3, 
              width: "100%", 
              color: "#818cf8", 
              borderColor: "#818cf8",
              "& .MuiAlert-icon": { color: "#818cf8" }
            }}
          >
            Authentication required to list an account.
          </Alert>
        )}

        <Typography variant="body2" color="gray" mb={3}>
          Login to manage your listings
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            name="email"
            margin="normal"
            fullWidth
            label="Email"
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

          {errorMsg && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errorMsg}
            </Alert>
          )}

          <Button 
            type="submit" 
            fullWidth 
            variant="contained" 
            disabled={loading}
            sx={{ 
              mt: 4, 
              mb: 2, 
              py: 1.5,
              bgcolor: "#6366f1", 
              fontWeight: "bold",
              "&:hover": { bgcolor: "#4f46e5" } 
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>

          <Typography variant="body2" textAlign="center" sx={{ mt: 1, color: "#9ca3af" }}>
            Don't have an account?{" "}
            <Link 
              component={NextLink} 
              href={`/signup?next=${encodeURIComponent(nextRoute)}&reason=${reason || ""}`} 
              sx={{ color: "#818cf8", textDecoration: "none", fontWeight: "bold" }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}