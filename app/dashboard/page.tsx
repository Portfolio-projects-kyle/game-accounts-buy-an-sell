"use client";

import { useEffect, useState } from "react";
import { supabase, type User } from "../../lib/supabaseClient";
import { Container, Box, Typography, Button } from "@mui/material";
import Home from "../page";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) setUser(data.session.user);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) setUser(session.user);
      else setUser(null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (!user) {
    return (
      <Home />
    );
  }

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
        <Typography variant="h4" mb={2}>
          Welcome!
        </Typography>
        <Typography variant="body1" mb={4}>
          You are logged in as <strong>{user.email ?? "unknown"}</strong>
        </Typography>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Container>
  );
}
