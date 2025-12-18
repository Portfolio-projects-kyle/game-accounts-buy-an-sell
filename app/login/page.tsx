"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation"; // Next.js App Router
import { Container, Box, TextField, Button, Typography, Link } from "@mui/material";
import NextLink from "next/link";
import { supabase } from "../../lib/supabaseClient";

interface LoginState {
  email: string;
  password: string;
}

export default function LoginPage(): JSX.Element {
  const [form, setForm] = useState<LoginState>({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else if (data.session) {
      console.log("Logged in:", data);
      // Redirect to dashboard
      router.push("/dashboard");
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
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" mb={3}>
          Login
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
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
          {errorMsg && <Typography color="error">{errorMsg}</Typography>}
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link component={NextLink} href="/signup">
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
